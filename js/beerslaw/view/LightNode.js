// Copyright 2002-2013, University of Colorado

/**
 * Visual representation of the light in the Beer's Law tab.
 * Origin is at the right center, where the light comes out of the "housing".
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  "use strict";

  // imports
  var BLLImages = require( "common/BLLImages" );
  var Image = require( "SCENERY/nodes/Image" );
  var inherit = require( "PHET_CORE/inherit" );
  var Node = require( "SCENERY/nodes/Node" );
  var Property = require( "AXON/Property" );
  var ToggleButton = require( "common/view/ToggleButton" );

  /**
   * @param {Light} light
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function LightNode( light, mvt ) {

    var thisNode = this;
    Node.call( this );

    // nodes
    var housing = new Image( BLLImages.getImage( "light.png" ) );
    var button = new ToggleButton( light.on, new Property( true ) );

    // make the button fit in the housing
    button.setScaleMagnitude( 0.65 * housing.height / button.height );

    // rendering order
    thisNode.addChild( housing );
    thisNode.addChild( button );

    // layout
    housing.x = -housing.width;
    housing.y = -housing.height / 2;
    button.left = housing.right - button.width - 40;
    button.centerY = housing.centerY;

    // position
    var position = mvt.modelToViewPosition( light.location );
    thisNode.x = position.x;
    thisNode.y = position.y;
  }

  inherit( LightNode, Node );

  return LightNode;
} );