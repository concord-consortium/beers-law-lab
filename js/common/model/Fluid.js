// Copyright 2002-2013, University of Colorado Boulder

/**
 * Base type for all fluids.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Property = require( 'AXON/Property' );

  /**
   * @param {Color} color
   * @constructor
   */
  function Fluid( color ) {
    this.color = new Property( color );
  }

  Fluid.prototype = {
    reset: function() {
      this.color.reset();
    }
  };

  return Fluid;
} );
