// Copyright 2002-2013, University of Colorado

/**
 * Horizontal slider.
 * Optionally snaps to min when released.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  "use strict";

  // imports
  var Dimension2 = require( "DOT/Dimension2" );
  var FillHighlighter = require( "common/view/FillHighlighter" );
  var inherit = require( "PHET_CORE/inherit" );
  var LinearFunction = require( "common/util/LinearFunction" );
  var Node = require( "SCENERY/nodes/Node" );
  var Path = require( "SCENERY/nodes/Path" );
  var Range = require( "DOT/Range" );
  var Shape = require( "KITE/Shape" );
  var SimpleDragHandler = require( "SCENERY/input/SimpleDragHandler" );
  var Text = require( "SCENERY/nodes/Text" );
  var Util = require( "DOT/Util" );

  // thumb constants
  var THUMB_SIZE = new Dimension2( 30, 45 );
  var THUMB_FILL_ENABLED = "rgb(50,145,184)";
  var THUMB_FILL_HIGHLIGHTED = "rgb(71,207,255)";
  var THUMB_FILL_DISABLED = "#F0F0F0";

  // tick constants
  var MAJOR_TICK_LENGTH = 30;
  var MINOR_TICK_LENGTH = 15;

  /**
   * @param {Range} range
   * @param {Dimension2} trackSize
   * @param {Property<Number>} value
   * @param {Property<Boolean>} enabled
   * @param {Boolean} snapToMinWhenReleased
   * @constructor
   */
  function EvaporationSlider( range, trackSize, value, enabled, snapToMinWhenReleased ) {

    // defaults
    snapToMinWhenReleased = _.isUndefined( snapToMinWhenReleased ) ? false : snapToMinWhenReleased;

    var thisNode = this;
    Node.call( thisNode );

    // ticks are added to this parent, so they are behind knob
    thisNode._ticksParent = new Node();
    thisNode.addChild( thisNode._ticksParent );

    // track
    thisNode._track = new Path(
        {
          shape: Shape.rect( 0, 0, trackSize.width, trackSize.height ),
          fill: "white",
          stroke: "black",
          lineWidth: 1
        } );
    thisNode.addChild( thisNode._track );

    // thumb, points up
    var thumb = new Path(
        {
          cursor: "pointer",
          shape: new Shape()/* clockwise from bottom left */
              .moveTo( -THUMB_SIZE.width / 2, THUMB_SIZE.height )
              .lineTo( THUMB_SIZE.width / 2, THUMB_SIZE.height )
              .lineTo( THUMB_SIZE.width / 2, 0.35 * THUMB_SIZE.height )
              .lineTo( 0, 0 )
              .lineTo( -THUMB_SIZE.width / 2, 0.35 * THUMB_SIZE.height )
              .close(),
          fill: THUMB_FILL_ENABLED,
          stroke: "black",
          lineWidth: 1
        } );
    thumb.centerY = thisNode._track.centerY;
    thisNode.addChild( thumb );

    // enable/disable thumb
    enabled.addObserver( function( enabled ) {
      thumb.fill = enabled ? THUMB_FILL_ENABLED : THUMB_FILL_DISABLED;
      thumb.cursor = enabled ? "pointer" : "default";
    } );

    // mapping between value and track position
    thisNode._valueToPosition = new LinearFunction( range, new Range( 0, trackSize.width ), true /* clamp */ );

    // move thumb when value changes
    value.addObserver( function( value ) {
      thumb.centerX = thisNode._valueToPosition.evaluate( value );
    } );

    // highlight on mouse enter
    thumb.addInputListener( new FillHighlighter( thumb, THUMB_FILL_ENABLED, THUMB_FILL_HIGHLIGHTED, enabled ) );

    // update value when thumb is dragged
    var clickXOffset = 0; // x-offset between initial click and thumb's origin
    thumb.addInputListener( new SimpleDragHandler(
        {
          start: function( event ) {
            clickXOffset = thumb.globalToParentPoint( event.pointer.point ).x - thumb.x;
          },
          drag: function( event ) {
            if ( enabled.get() ) {
              var x = thumb.globalToParentPoint( event.pointer.point ).x - clickXOffset;
              value.set( thisNode._valueToPosition.evaluateInverse( x ) );
            }
          },
          end: function() {
            if ( snapToMinWhenReleased ) {
              value.set( range.min );
            }
          },
          translate: function() {
          }
        } )
    );

    // update thumb location when value changes
    value.addObserver( function( value ) {
      thumb.centerX = thisNode._valueToPosition.evaluate( value );
    } );
  }

  inherit( EvaporationSlider, Node );

  /**
   * Adds a major tick mark.
   * @param {Number} value
   * @param {Node} label optional
   */
  EvaporationSlider.prototype.addMajorTick = function( value, label ) {
    this._addTick( MAJOR_TICK_LENGTH, value, label );
  };

  /**
   * Adds a minor tick mark.
   * @param {Number} value
   * @param {Node} label optional
   */
  EvaporationSlider.prototype.addMinorTick = function( value, label ) {
    this._addTick( MINOR_TICK_LENGTH, value, label );
  };

  /*
   * Adds a tick mark above the track.
   * @param {Number} tickLength
   * @param {Number} value
   * @param {Node} label optional
   */
  EvaporationSlider.prototype._addTick = function( tickLength, value, label ) {
    var labelX = this._valueToPosition.evaluate( value );
    // ticks
    var tick = new Path(
        {
          shape: new Shape()
              .moveTo( labelX, this._track.top )
              .lineTo( labelX, this._track.bottom - tickLength ),
          lineWidth: 1,
          stroke: "black"
        } );
    this._ticksParent.addChild( tick );
    // label
    if ( label ) {
      this._ticksParent.addChild( label );
      label.centerX = tick.centerX;
      label.bottom = tick.top - 6;
    }
  };

  return EvaporationSlider;
} );