// Copyright 2002-2013, University of Colorado

/**
 * Control panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function ( require ) {
  "use strict";

  // imports
  var inherit = require( "PHET_CORE/inherit" );
  var Node = require( "SCENERY/nodes/Node" );
  var Path = require( "SCENERY/nodes/Path" );
  var Shape = require( "KITE/Shape" );

  //TODO move xMargin, yMargin to options
  /**
   * @param {Node} contentNode
   * @param {Number} xMargin, optional
   * @param {Number} yMargin, optional
   * @param options scenery.Node options
   * @constructor
   */
  function ControlPanelNode( contentNode, xMargin, yMargin, options ) {

    xMargin = ( xMargin || 20 );
    yMargin = ( yMargin || 10 );

    var thisNode = this;
    Node.call( thisNode, options );

    var panelNode = new Path( { fill: "#F0F0F0", stroke: "gray", lineWidth: 1  } );
    thisNode.addChild( panelNode );
    thisNode.addChild( contentNode );

    this.resize = function () {
      panelNode.setShape( Shape.roundRect( 0, 0, contentNode.width + ( 2 * xMargin ), contentNode.height + ( 2 * yMargin ), 10, 10 ) );
      contentNode.centerX = panelNode.centerX;
      contentNode.centerY = panelNode.centerY;
    };
    thisNode.resize();
  }

  inherit( ControlPanelNode, Node );

  return ControlPanelNode;
} );