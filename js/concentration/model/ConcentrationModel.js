// Copyright 2002-2013, University of Colorado

/**
 * Model container for the "Concentration" module.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define(
  [
    "DOT/Dimension2",
    "DOT/Vector2",
    "PHETCOMMON/math/Range",
    "PHETCOMMON/model/property/Property",
    "common/model/Rectangle",
    "concentration/model/Beaker",
    "concentration/model/ConcentrationSolution",
    "concentration/model/Shaker",
    "concentration/model/Dropper",
    "concentration/model/Faucet",
    "concentration/model/Solute"
  ],
  function ( Dimension2, Vector2, Range, Property, Rectangle, Beaker, ConcentrationSolution, Shaker, Dropper, Faucet, Solute ) {
    "use strict";

    function ConcentrationModel() {

      var model = this;

      // constants
      var BEAKER_VOLUME = 1; // L
      var SOLUTION_VOLUME_RANGE = new Range( 0, BEAKER_VOLUME, 0.5 ); // L
      var SOLUTE_AMOUNT = new Range( 0, 6, 0 ); // moles
      var DEFAULT_SOLUTE_AMOUNT = 0; // moles
      var MAX_EVAPORATION_RATE = 0.25; // L/sec
      var MAX_INPUT_FLOW_RATE = 0.25; // L/sec
      var MAX_OUTPUT_FLOW_RATE = MAX_INPUT_FLOW_RATE; // L/sec
      var DROPPER_FLOW_RATE = 0.05; // L/sec
      var SHAKER_MAX_DISPENSING_RATE = 0.2; // mol/sec

      // Solutes, in rainbow (ROYGBIV) order.
      model.solutes = [
        Solute.DRINK_MIX,
        Solute.COBALT_II_NITRATE,
        Solute.COBALT_CHLORIDE,
        Solute.POTASSIUM_DICHROMATE,
        Solute.POTASSIUM_CHROMATE,
        Solute.NICKEL_II_CHLORIDE,
        Solute.COPPER_SULFATE,
        Solute.POTASSIUM_PERMANGANATE
      ];

      // model elements
      model.soluteProperty = new Property( model.solutes[0] );
      model.solution = new ConcentrationSolution( model.soluteProperty, DEFAULT_SOLUTE_AMOUNT, SOLUTION_VOLUME_RANGE.defaultValue );
      model.beaker = new Beaker( new Vector2( 400, 550 ), new Dimension2( 600, 300 ), 1 );
      model.shaker = new Shaker( new Vector2( 340, 170 ), new Rectangle( 225, 50, 400, 160 ), 0.75 * Math.PI, model.soluteProperty, SHAKER_MAX_DISPENSING_RATE );
      model.dropper = new Dropper( new Vector2( 375, 210 ), new Rectangle( 230, 205, 400, 30 ), model.soluteProperty, DROPPER_FLOW_RATE );
      model.solventFaucet = new Faucet( new Vector2( 150, 220 ), 40, 100, MAX_INPUT_FLOW_RATE );
      model.drainFaucet = new Faucet( new Vector2( 790, 607 ), 40, 5, MAX_OUTPUT_FLOW_RATE );

      //TODO add model elements: precipitate, shakerParticles, concentrationMeter

      // model properties
      var soluteFormProperty = new Property( Solute.SoluteForm.SOLID );

      // Things to do when the solute is changed.
      model.soluteProperty.addObserver( function ( solute ) {
        model.solution.soluteAmountProperty.set( 0 );
      } );

      // Show the correct dispenser for the solute form
      soluteFormProperty.addObserver( function ( soluteForm ) {
        model.shaker.visibleProperty.set( soluteForm == Solute.SoluteForm.SOLID );
        model.dropper.visible.set( soluteForm == Solute.SoluteForm.STOCK_SOLUTION );
      } );
    }

      // Resets all model elements
    ConcentrationModel.prototype.reset = function () {
      var model = this;
      model.soluteProperty.reset();
      model.beaker.reset();
      model.shaker.reset();
      model.solventFaucet.reset();
      model.drainFaucet.reset();
    };

    // Animates the model
    ConcentrationModel.prototype.step = function () {
      this.shaker.step();
    };

    return ConcentrationModel;
  } );
