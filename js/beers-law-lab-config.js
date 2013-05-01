// Copyright 2002-2013, University of Colorado

/*
 * RequireJS configuration file for the "Beer's Law Lab" sim.
 * Paths are relative to the location of this file.
 *
 * @author Chris Malley
 */

requirejs.config(
  {
    deps: ["beers-law-lab-main"],

    config: {
      i18n: {
        locale: "en_us"
      }
    },

    paths: {

      // third-party libs
      i18n: "../lib/i18n-2.0.2",
      image: "../lib/image-0.2.1", //TODO replace with ImagesLoaded
      imagesloaded: "../lib/jquery.imagesloaded-2.1.1",

      // PhET libs, uppercase names to identify them in require.js imports
      ASSERT: "../../assert/js",
      DOT: "../../dot/js",
      FORT: "../../fort/js",
      JOIST: "../../joist/js",
      KITE: "../../kite/js",
      PHET_CORE: "../../phet-core/js",
      PHETCOMMON: "../../phetcommon/js",
      SCENERY: "../../scenery/js",
      SCENERY_PHET: "../../scenery-phet/js",
      SUN: "../../sun/js"
    },

    shim: {
      jquery: { exports: "$" }
    },

    //TODO remove this before deploy
    urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts
  } );
