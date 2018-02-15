/* global $ */
/* global Utils */
/* global unescape */
/* global document */
/* export config */

var getIncludeParameters = function()
{
    var scripts = document.getElementsByTagName('script');
    var myScript = scripts[ scripts.length - 6 ];
    // var scripts = document.getElementsByTagName('script');
    // var myScript = scripts[ scripts.length - 1 ];

    var queryString = myScript.src.replace(/^[^\?]+\??/,'');

    var params = parseQuery( queryString );

    function parseQuery ( query ) {
        var Params = new Object ();
        if ( ! query ) return Params; // return empty object
        var Pairs = query.split(/[;&]/);
        for ( var i = 0; i < Pairs.length; i++ ) {
            var KeyVal = Pairs[i].split('=');
            if ( ! KeyVal || KeyVal.length != 2 ) continue;
            var key = unescape( KeyVal[0] );
            var val = unescape( KeyVal[1] );
            val = val.replace(/\+/g, ' ');
            Params[key] = val;
        }
        return Params;
    }

    return params;
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

$(document).ready(function()
{
    var id_bodega = 0;
    var nombre_bodega = "";

    var base_url = $.environmentVar(
        'http://localhost:8520/',
        'https://apibodegas.ondev.today/',
        'https://apibodegas.loadingplay.com/');
    var checkout_url = $.environmentVar(
        'http://localhost:8522/',
        'https://lpcheckout.ondev.today/',
        'https://pay.loadingplay.com');
    var app_public = $.environmentVar(42,42,42);
    var site_name = $.environmentVar('bilupo', 'bilupo', 'bilupo');

    window.config = {
        'app_public': app_public,
        'base_url': base_url,
        'products_per_page' : 9,
        'tag': '',
        'ignore_stock': false,
        'infinite_scroll': true,
        'checkout_url': checkout_url,
        'analytics' : true,
        'templateOrigin': '#product_template',
        'onLoad': function(products)
        {

        }
    };

    $(document).ecommerce('destroy');
    $(".products").ecommerce(config);

    $(document).on("click", ".btn-bodega", function()
    {
        id_bodega = $(".id_bodega").val();
        nombre_bodega = $(".nombre_bodega").val();

        window.config.app_public = id_bodega;
        window.config.site_name = nombre_bodega;

        $(document).ecommerce('destroy');
        $(".products").ecommerce(config);

        $(".sitio").val(id_bodega);

        console.log(config);
    });
});
