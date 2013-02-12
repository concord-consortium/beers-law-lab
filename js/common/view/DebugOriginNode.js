// Copyright 2002-2013, University of Colorado

/**
 * To debug the origin of a composite node, add an instance of this node as a child.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define(
  [ 'easel', 'PHETCOMMON/model/Inheritance' ],
  function ( Easel, Inheritance ) {

    function DebugOriginNode( color ) {
      Easel.Shape.call( this );
      this.graphics.beginFill( color ).drawCircle( 0, 0, 3 );
    }

    Inheritance.inheritPrototype( DebugOriginNode, Easel.Shape );

    return DebugOriginNode;
  } );
