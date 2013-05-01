// Copyright 2013, University of Colorado

/**
 * Control for changing solution's concentration.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function ( require ) {
  "use strict";

  // imports
  var BLLStrings = require( "common/BLLStrings" );
  var ConcentrationSliderNode = require( "beerslaw/view/ConcentrationSliderNode" );
  var inherit = require( "PHET_CORE/inherit" );
  var Node = require( "SCENERY/nodes/Node" );
  var Rectangle = require( "SCENERY/nodes/Rectangle" );  //TODO delete me
  var StringUtils = require( "common/util/StringUtils" );
  var Text = require( "SCENERY/nodes/Text" );

  // constants
  var FONT = "20px Arial";
  var DECIMAL_PLACES = 0;

  /**
   * @param {Property} solution of type  BeersLawSolution
   * @constructor
   */
  function ConcentrationControlNode( solution ) {

    var thisNode = this;
    Node.call( thisNode );

    // nodes
    var labelNode = new Text( StringUtils.format( BLLStrings.pattern_0label, [BLLStrings.concentration] ), { font: FONT } );
    var sliderNode = new ConcentrationSliderNode( solution );
    var valueNode = new Text( "?", { font: FONT } );

    // rendering order
    thisNode.addChild( labelNode );
    thisNode.addChild( sliderNode );
    thisNode.addChild( valueNode );

    // layout
    sliderNode.left = labelNode.right + 8;
    sliderNode.centerY = labelNode.centerY;
    valueNode.left = sliderNode.right + 10;
    valueNode.centerY = labelNode.centerY;

    // update the value display when concentration changes
    var concentrationObserver = function () {
      var valueString = solution.get().getViewValue().toFixed( DECIMAL_PLACES );
      var units = solution.get().getViewUnits();
      valueNode.text = StringUtils.format( BLLStrings.pattern_0value_1units, [ valueString, units ] );
    };
    solution.get().concentration.addObserver( concentrationObserver );

    // when solution changes, rewire the concentration observer
    solution.addObserver( function ( newSolution, oldSolution ) {
      if ( oldSolution ) {
        oldSolution.concentration.removeObserver( concentrationObserver );
      }
      newSolution.concentration.addObserver( concentrationObserver );
    } );
  }

  inherit( ConcentrationControlNode, Node );

  return ConcentrationControlNode;
} );