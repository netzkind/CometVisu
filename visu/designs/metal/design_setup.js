//
//  Design setup for the metal design
//
//   Copyright (C) 2012 by Christian Mayer
//   cometvisu (at) ChristianMayer.de
//
//   This program is free software; you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation; either version 2 of the License, or
//   (at your option) any later version.
//
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.
//
//   You should have received a copy of the GNU General Public License
//   along with this program; if not, write to the
//   Free Software Foundation, Inc.,
//   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
//
//////////////////////////////////////////////////////////////////////////////
//$(".value < img").css("padding", "0");
$('#navbarLeft').data({'columns': 6} );

var started=true;

function getOffsetCorners(elem) {
  return {
    top_left: {top: Math.round(elem.offset().top), left: Math.round(elem.offset().left) },
    bottom_left: {top: Math.round(elem.offset().top+elem.height()), left: Math.round(elem.offset().left) },
    top_right: {top: Math.round(elem.offset().top), left: Math.round(elem.offset().left+elem.width()) },
    bottom_right: {top: Math.round(elem.offset().top+elem.height()), left: Math.round(elem.offset().left+elem.width()) },
  };
}
function roundCorners() {
  // find elements in each groups corners
    $('.page.activePage .group:visible').each(function(i) {
      var group = $(this);
      // do not use this in navbars
      if (group.parents('.navbar').size()>0) return;
      var groupCorners = getOffsetCorners(group);
      // if the group has a headline (=name) we must not round the upper corners
      var roundUpperCorners =  ($(this).find('.widget_container:first-child').size()>0) && group.css('border-top-right-radius')!="0px";
      var threshold=5;
      $(this).find('.widget_container').each(function (i) {
        var elemCorners = getOffsetCorners($(this));
        if (roundUpperCorners) {
          // upper left corner is done by regular  css-rule  upper right corner
          if (Math.abs(elemCorners.top_right.top-groupCorners.top_right.top)<threshold && Math.abs(elemCorners.top_right.left-groupCorners.top_right.left)<threshold) {
            $(this).css({'border-top-right-radius': group.css('border-top-right-radius')});
            $(this).children().css({'border-top-right-radius': group.css('border-top-right-radius')});
          }
        }
        if (group.css('border-bottom-right-radius')!="0px" && Math.abs(elemCorners.bottom_right.top-groupCorners.bottom_right.top)<threshold && Math.abs(elemCorners.bottom_right.left-groupCorners.bottom_right.left)<threshold) {
          $(this).css({'border-bottom-right-radius': group.css('border-bottom-right-radius')});
          $(this).children().css({'border-bottom-right-radius': group.css('border-bottom-right-radius')});
        }
        if (group.css('border-bottom-left-radius')!="0px" && Math.abs(elemCorners.bottom_left.top-groupCorners.bottom_left.top)<threshold && Math.abs(elemCorners.bottom_left.left-groupCorners.bottom_left.left)<threshold) {
          $(this).css({'border-bottom-left-radius': group.css('border-bottom-left-radius')});
          $(this).children().css({'border-bottom-left-radius': group.css('border-bottom-left-radius')});
        }
      });
    });
}
$(window).bind('scrolltopage',function() {
  //$('#id_0').append(navigator.userAgent.toLowerCase());
  if (/(opera|chrome|safari)/i.test(navigator.userAgent.toLowerCase())) {
    roundCorners();
  }
});

$(window).resize(function() {
  // only execute on start
    if (started) {
      if ($('.navbar').size()>0) {
         $('.navbar > .widget_container:first-child .group:not(.root) .pagejump:first-child .actor').each(function(i) {
           var target = ($(this).data().target.match(/^id_[0-9_]+$/)==null) ? $('.page h1:contains('+$(this).data().target+')').closest(".page").attr("id") : $(this).data().target;
           if (target=="id_0") {
             // pagejump to root-page found
             var group = $(this).closest(".group");
             if (group.find('.widget_container').size()==1)
               group.addClass("root");
           }
         });
       }
       if (/(iphone|ipod|ipad)/i.test(navigator.userAgent.toLowerCase())) {
         // disable scrolling
         main_scroll.getConf().speed=0;
         $('body').css('padding-top','1em');
         handleResize(true);
       }
       $('#navbarLeft .navbar .widget .label,#navbarRight .navbar .widget .label').each(function(i) {
         var label = $(this);
         if (label.text().trim()!="") {
           var actor = label.siblings('.actor');
           if (label.children('img').size()==0 && actor.children('.value').text().trim()!="") {
             actor.css('padding-top','0.5em');
           }
         }
       });
       // Disable borders for groups that contain widget-group as children
       $('.page > div > .widget_container > .group:not(.widget)').each(function(i) {
         var $this = $(this);
         if ($this.find('.clearfix > .widget_container > .group.widget').size()>0) {
           $this.css({'border': 'none', 'margin': 0});
         }
       });
       started=false;
    }
});

icons.insert({
  'CometVisu'             : { '*'  : '128',
                              '16' : { '*'         : 'sodium'                                                              ,
                                       'black'     : { 'uri': 'icon/comet_16_000000.png'                                  },
                                       'white'     : { 'uri': 'icon/comet_16_ffffff.png'                                  },
                                       'antimony'  : { 'uri': 'icon/comet_16_00ddff.png'                                  },
                                       'boron'     : { 'uri': 'icon/comet_16_00ff11.png'                                  },
                                       'lithium'   : { 'uri': 'icon/comet_16_ff0000.png'                                  },
                                       'potassium' : { 'uri': 'icon/comet_16_d00055.png'                                  },
                                       'sodium'    : { 'uri': 'icon/comet_16_ff8000.png'                                  } },
                              '32' : { '*'         : 'sodium'                                                              ,
                                       'black'     : { 'uri': 'icon/comet_32_000000.png'                                  },
                                       'white'     : { 'uri': 'icon/comet_32_ffffff.png'                                  },
                                       'antimony'  : { 'uri': 'icon/comet_32_00ddff.png'                                  },
                                       'boron'     : { 'uri': 'icon/comet_32_00ff11.png'                                  },
                                       'lithium'   : { 'uri': 'icon/comet_32_ff0000.png'                                  },
                                       'potassium' : { 'uri': 'icon/comet_32_d00055.png'                                  },
                                       'sodium'    : { 'uri': 'icon/comet_32_ff8000.png'                                  } },
                              '64' : { '*'         : 'sodium'                                                              ,
                                       'black'     : { 'uri': 'icon/comet_64_000000.png'                                  },
                                       'white'     : { 'uri': 'icon/comet_64_ffffff.png'                                  },
                                       'antimony'  : { 'uri': 'icon/comet_64_00ddff.png'                                  },
                                       'boron'     : { 'uri': 'icon/comet_64_00ff11.png'                                  },
                                       'lithium'   : { 'uri': 'icon/comet_64_ff0000.png'                                  },
                                       'potassium' : { 'uri': 'icon/comet_64_d00055.png'                                  },
                                       'sodium'    : { 'uri': 'icon/comet_64_ff8000.png'                                  } },
                              '128': { '*'         : 'sodium'                                                              ,
                                       'black'     : { 'uri': 'icon/comet_128_000000.png'                                 },
                                       'white'     : { 'uri': 'icon/comet_128_ffffff.png'                                 },
                                       'antimony'  : { 'uri': 'icon/comet_128_00ddff.png'                                 },
                                       'boron'     : { 'uri': 'icon/comet_128_00ff11.png'                                 },
                                       'lithium'   : { 'uri': 'icon/comet_128_ff0000.png'                                 },
                                       'potassium' : { 'uri': 'icon/comet_128_d00055.png'                                 },
                                       'sodium'    : { 'uri': 'icon/comet_128_ff8000.png'                                 } } },
  'audio_audio'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/audio_audio.png'            , 'style': 'height: 2em;' },
                                       'sodium'    : { 'uri': 'icon/knx-uf-iconset/128x128_or/audio_audio.png'            , 'style': 'height: 2em;' } } },
  'audio_eject'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/audio_eject.png'            , 'style': 'height: 2em;' } } },
  'audio_ff'              : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/audio_ff.png'               , 'style': 'height: 2em;' } } },
  'audio_mute'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/audio_mute.png'             , 'style': 'height: 2em;' } } },
  'audio_pause'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/audio_pause.png'            , 'style': 'height: 2em;' } } },
  'audio_playliste'       : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/audio_playliste.png'        , 'style': 'height: 2em;' } } },
  'audio_play'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/audio_play.png'             , 'style': 'height: 2em;' } } },
  'audio_rec'             : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/audio_rec.png'              , 'style': 'height: 2em;' } } },
  'audio_rew'             : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/audio_rew.png'              , 'style': 'height: 2em;' } } },
  'audio_sound'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/audio_sound.png'            , 'style': 'height: 2em;' } } },
  'audio_stop'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/audio_stop.png'             , 'style': 'height: 2em;' } } },
  'fts_fenster_gekippt'   : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/fts_fenster_gekippt.png'    , 'style': 'height: 2em;' } } },
  'fts_fenster_offen'     : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/fts_fenster_offen.png'      , 'style': 'height: 2em;' } } },
  'fts_fenster'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/fts_fenster.png'            , 'style': 'height: 2em;' } } },
  'fts_garage'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/fts_garage.png'             , 'style': 'height: 2em;' } } },
  'fts_markise'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/fts_markise.png'            , 'style': 'height: 2em;' } } },
  'fts_rollo'             : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/fts_rollo.png'              , 'style': 'height: 2em;' } } },
  'fts_tuer_offen'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/fts_tuer_offen.png'         , 'style': 'height: 2em;' } } },
  'fts_tuer'              : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/fts_tuer.png'               , 'style': 'height: 2em;' } } },
  'it_fernsehen'          : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_fernsehen.png'           , 'style': 'height: 2em;' } } },
  'it_funk_dcf77'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_funk_dcf77.png'          , 'style': 'height: 2em;' } } },
  'it_internet'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_internet.png'            , 'style': 'height: 2em;' } } },
  'it_kamera'             : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_kamera.png'              , 'style': 'height: 2em;' } } },
  'it_nas'                : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_nas.png'                 , 'style': 'height: 2em;' } } },
  'it_netz'               : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_netz.png'                , 'style': 'height: 2em;' } } },
  'it_netzwerk'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_netzwerk.png'            , 'style': 'height: 2em;' } } },
  'it_pc'                 : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_pc.png'                  , 'style': 'height: 2em;' } } },
  'it_radio'              : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_radio.png'               , 'style': 'height: 2em;' } } },
  'it_router'             : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_router.png'              , 'style': 'height: 2em;' } } },
  'it_server'             : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_server.png'              , 'style': 'height: 2em;' } } },
  'it_smartphone'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_smartphone.png'          , 'style': 'height: 2em;' } } },
  'it_telefon'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_telefon.png'             , 'style': 'height: 2em;' } } },
  'it_wlan'               : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/it_wlan.png'                , 'style': 'height: 2em;' } } },
  'licht_esstisch'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/licht_esstisch.png'         , 'style': 'height: 2em;' } } },
  'licht_indirekt'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/licht_indirekt.png'         , 'style': 'height: 2em;' } } },
  'licht_led'             : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/licht_led.png'              , 'style': 'height: 2em;' } } },
  'licht_lichterkette'    : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/licht_lichterkette.png'     , 'style': 'height: 2em;' } } },
  'licht_licht'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/licht_licht.png'            , 'style': 'height: 2em;' } } },
  'licht_party'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/licht_party.png'            , 'style': 'height: 2em;' } } },
  'licht_regelung'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/licht_regelung.png'         , 'style': 'height: 2em;' } } },
  'licht_stehlampe'       : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/licht_stehlampe.png'        , 'style': 'height: 2em;' } } },
  'meld_achtung'          : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/meld_achtung.png'           , 'style': 'height: 2em;' } } },
  'meld_medizin'          : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/meld_medizin.png'           , 'style': 'height: 2em;' } } },
  'meld_post_offen'       : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/meld_post_offen.png'        , 'style': 'height: 2em;' } } },
  'meld_post'             : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/meld_post.png'              , 'style': 'height: 2em;' } } },
  'meld_service'          : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/meld_service.png'           , 'style': 'height: 2em;' } } },
  'meld_steckdose'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/meld_steckdose.png'         , 'style': 'height: 2em;' } } },
  'sani_bewaesserung'     : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/sani_bewaesserung.png'      , 'style': 'height: 2em;' } } },
  'sani_fussbodenheizung' : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/sani_fussbodenheizung.png'  , 'style': 'height: 2em;' } } },
  'sani_heizung'          : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/sani_heizung.png'           , 'style': 'height: 2em;' } } },
  'sani_kessel_temp'      : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/sani_kessel_temp.png'       , 'style': 'height: 2em;' } } },
  'sani_lueftung'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/sani_lueftung.png'          , 'style': 'height: 2em;' } } },
  'sani_lueftung_regelung': { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/sani_lueftung_regelung.png' , 'style': 'height: 2em;' } } },
  'sani_pumpe'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/sani_pumpe.png'             , 'style': 'height: 2em;' } } },
  'sani_solar'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/sani_solar.png'             , 'style': 'height: 2em;' } } },
  'sani_solar_temp'       : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/sani_solar_temp.png'        , 'style': 'height: 2em;' } } },
  'sani_wasserhahn'       : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/sani_wasserhahn.png'        , 'style': 'height: 2em;' } } },
  'secur_alarmanlage'     : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/secur_alarmanlage.png'      , 'style': 'height: 2em;' } } },
  'secur_codierung'       : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/secur_codierung.png'        , 'style': 'height: 2em;' } } },
  'secur_frostschutz'     : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/secur_frostschutz.png'      , 'style': 'height: 2em;' } } },
  'secur_hitzeschutz'     : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/secur_hitzeschutz.png'      , 'style': 'height: 2em;' } } },
  'secur_offen'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/secur_offen.png'            , 'style': 'height: 2em;' } } },
  'secur_rauchmelder'     : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/secur_rauchmelder.png'      , 'style': 'height: 2em;' } } },
  'secur_zu'              : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/secur_zu.png'               , 'style': 'height: 2em;' } } },
  'steuer_ab'             : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/steuer_ab.png'              , 'style': 'height: 2em;' } } },
  'steuer_alles_ein_aus'  : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/steuer_alles_ein_aus.png'   , 'style': 'height: 2em;' } } },
  'steuer_auf'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/steuer_auf.png'             , 'style': 'height: 2em;' } } },
  'steuer_aussen_ein_aus' : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/steuer_aussen_ein_aus.png'  , 'style': 'height: 2em;' } } },
  'steuer_ein_aus'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/steuer_ein_aus.png'         , 'style': 'height: 2em;' } } },
  'steuer_home'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/steuer_home.png'            , 'style': 'height: 2em;' } } },
  'steuer_minus'          : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/steuer_minus.png'           , 'style': 'height: 2em;' } } },
  'steuer_plus'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/steuer_plus.png'            , 'style': 'height: 2em;' } } },
  'steuer_standby'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/steuer_standby.png'         , 'style': 'height: 2em;' } } },
  'steuer_vor'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/steuer_vor.png'             , 'style': 'height: 2em;' } } },
  'steuer_x'              : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/steuer_x.png'               , 'style': 'height: 2em;' } } },
  'steuer_zurueck'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/steuer_zurueck.png'         , 'style': 'height: 2em;' } } },
  'szene_essen'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_essen.png'            , 'style': 'height: 2em;' } } },
  'szene_garten'          : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_garten.png'           , 'style': 'height: 2em;' } } },
  'szene_kochen'          : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_kochen.png'           , 'style': 'height: 2em;' } } },
  'szene_making_love'     : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_making_love.png'      , 'style': 'height: 2em;' } } },
  'szene_nacht'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_nacht.png'            , 'style': 'height: 2em;' } } },
  'szene_party'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_party.png'            , 'style': 'height: 2em;' } } },
  'szene_pool'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_pool.png'             , 'style': 'height: 2em;' } } },
  'szene_schlafen'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_schlafen.png'         , 'style': 'height: 2em;' } } },
  'szene_schwimmen'       : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_schwimmen.png'        , 'style': 'height: 2em;' } } },
  'szene_szene'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_szene.png'            , 'style': 'height: 2em;' } } },
  'szene_terrasse'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_terrasse.png'         , 'style': 'height: 2em;' } } },
  'szene_toilette'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_toilette.png'         , 'style': 'height: 2em;' } } },
  'szene_weihnachten'     : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/szene_weihnachten.png'      , 'style': 'height: 2em;' } } },
  'temp_aussen'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/temp_aussen.png'            , 'style': 'height: 2em;' } } },
  'temp_frost'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/temp_frost.png'             , 'style': 'height: 2em;' } } },
  'temp_innen'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/temp_innen.png'             , 'style': 'height: 2em;' } } },
  'temp_regelung'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/temp_regelung.png'          , 'style': 'height: 2em;' } } },
  'temp_temperatur'       : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/temp_temperatur.png'        , 'style': 'height: 2em;' } } },
  'user_abwesend'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/user_abwesend.png'          , 'style': 'height: 2em;' } } },
  'user_anwesend'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/user_anwesend.png'          , 'style': 'height: 2em;' } } },
  'user_ext_away'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/user_ext_away.png'          , 'style': 'height: 2em;' } } },
  'wetter_bewoelkt'       : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/wetter_bewoelkt.png'        , 'style': 'height: 2em;' } } },
  'wetter_feuchtigkeit'   : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/wetter_feuchtigkeit.png'    , 'style': 'height: 2em;' } } },
  'wetter_gewitter'       : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/wetter_gewitter.png'        , 'style': 'height: 2em;' } } },
  'wetter_pollen'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/wetter_pollen.png'          , 'style': 'height: 2em;' } } },
  'wetter_regen'          : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/wetter_regen.png'           , 'style': 'height: 2em;' } } },
  'wetter_schnee'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/wetter_schnee.png'          , 'style': 'height: 2em;' } } },
  'wetter_sommer'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/wetter_sommer.png'          , 'style': 'height: 2em;' } } },
  'wetter_sonne'          : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/wetter_sonne.png'           , 'style': 'height: 2em;' } } },
  'wetter_unwetter'       : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/wetter_unwetter.png'        , 'style': 'height: 2em;' } } },
  'wetter_wind'           : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/wetter_wind.png'            , 'style': 'height: 2em;' } } },
  'wetter_winter'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/wetter_winter.png'          , 'style': 'height: 2em;' } } },
  'zeit_automatik'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/zeit_automatik.png'         , 'style': 'height: 2em;' } } },
  'zeit_diagramm'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/zeit_diagramm.png'          , 'style': 'height: 2em;' } } },
  'zeit_ecomode'          : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/zeit_ecomode.png'           , 'style': 'height: 2em;' } } },
  'zeit_handbetrieb'      : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/zeit_handbetrieb.png'       , 'style': 'height: 2em;' } } },
  'zeit_kalender'         : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/zeit_kalender.png'          , 'style': 'height: 2em;' } } },
  'zeit_notiz'            : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/zeit_notiz.png'             , 'style': 'height: 2em;' } } },
  'zeit_statistik'        : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/zeit_statistik.png'         , 'style': 'height: 2em;' } } },
  'zeit_uhr'              : { '*':   { '*'         : 'white',
                                       'white'     : { 'uri': 'icon/knx-uf-iconset/128x128_ws/zeit_uhr.png'               , 'style': 'height: 2em;' } } }
});