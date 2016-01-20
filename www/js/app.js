// (1) APIキー
/** アプリケーションキーをかmBaaSからコピーして書き換えてください **/
var YOUR_APP_KEY = "YOUR_NCMB_APP_KEY";

/** クライアントキーをかmBaaSからコピーして書き換えてください **/
var YOUR_CLIENT_KEY = "YOUR_NCMB_CLIENT_KEY";

var ncmb;
var acce_array;
var acce_flag;
var gps_flag;
var current;

$(function(){
    //(2) mbaaSの初期化
    /*****↓ここに記入*****/

    /*****↑ここに記入*****/
    
    acce_array = new Array();
    acce_flag = new Boolean(false);
    gps_flag = new Boolean(false);

});

function acce_start(){
    acce_flag = true; 
    // [1] 加速度センサーから値（x, y, z 軸方向に動く値）を取得する
    /*****↓ここに記入*****/

    /*****↑ここに記入*****/
}

function acce_stop(){
    acce_flag = false;
    acce_save_ncmb(acce_array);
    document.acce_js.x.value=null;
    document.acce_js.y.value=null;
    document.acce_js.z.value=null;
    document.getElementById("color").src="js/img/white.png";
}

function gps_start(){
    gps_flag = true;
    // [2] GPSセンサーから値（緯度経度）を取得する
    /*****↓ここに記入*****/

    /*****↑ここに記入*****/
}

function gps_stop(){
    gps_flag = false;
    gps_save_ncmb(current.geopoint.latitude,current.geopoint.longitude);
    document.gps_js.lat.value=null;
    document.gps_js.lng.value=null;
    $(".map").empty();
}

// 加速度の値を保存する
function acce_save_ncmb(acce){
        // (3)-1 データストアに保存用クラスを作成
        /*****↓ここに記入*****/
        
        /*****↑ここに記入*****/
        
        // (4)-1 クラスのインスタンスを生成
        /*****↓ここに記入*****/
        
        /*****↑ここに記入*****/
        
        // (6)-1 データの保存
        /*****↓ここに記入*****/
        
        /*****↑ここに記入*****/
}

// GPSの値を保存する
function gps_save_ncmb(lat, lng){
        // (3)-2 データストアに保存用クラスを作成
        /*****↓ここに記入*****/
        
        /*****↑ここに記入*****/
        
        // (4)-2 クラスのインスタンスを生成
        /*****↓ここに記入*****/
        
        /*****↑ここに記入*****/
        
        // (5) 位置情報オブジェクトを作成
        /*****↓ここに記入*****/
        
        /*****↑ここに記入*****/
        
        // (6)-2 データの保存
        /*****↓ここに記入*****/
        
        /*****↑ここに記入*****/
}

// 加速度センサーから値の取得に成功した場合のコールバック
function onAcceSuccess(acceleration) {
    if(acce_flag){
        document.acce_js.x.value=acceleration.x;
        document.acce_js.y.value=acceleration.y;
        document.acce_js.z.value=acceleration.z;
        
        // センサーの値の変化を色で表示する
        if(Math.abs(acceleration.x)>20 || Math.abs(acceleration.y)>20 || Math.abs(acceleration.z)>20){
            document.getElementById("color").src="js/img/red.png";//赤
        }else if(Math.abs(acceleration.x)>13 || Math.abs(acceleration.y)>13 || Math.abs(acceleration.z)>13){
            document.getElementById("color").src="js/img/yellow.png";//黄
        }else{
            document.getElementById("color").src="js/img/blue.png";//青
        }
        
        var acce = [acceleration.x,acceleration.y,acceleration.z];
        acce_array.push(acce);
    }
};

// 加速度センサーから値の取得に失敗した場合のコールバック
function onAcceError() {
    console.log('onAcceError!');
};
// 加速度センサーから値をする時に設定するオプション
var acceOptions = {
    // 取得する間隔を１秒に設定
    frequency: 1000
}; 

//位置情報取得に成功した場合のコールバック
var onGeoSuccess = function(position){
    if(gps_flag){
        current = new CurrentPoint();
        //検索範囲の半径を保持する
        current.distance = CurrentPoint.distance;
        //位置情報(座標)を保存する
        current.geopoint = position.coords;
        $(".map").empty();
        writemap(current.geopoint.latitude,current.geopoint.longitude);
        document.gps_js.lat.value=current.geopoint.latitude;
        document.gps_js.lng.value=current.geopoint.longitude;
    }
};

// 位置情報取得に失敗した場合のコールバック
var onGeoError = function(error){
    console.log("現在位置を取得できませんでした");
};

// 位置情報取得時に設定するオプション
var geoOption = {
    // 取得する間隔を１秒に設定
    frequency: 1000,
    // 6秒以内に取得できない場合はonGeoErrorコールバックに渡すよう設定
    timeout: 6000
};

// 位置情報を保持するクラスを作成
function CurrentPoint(){
    // 端末の位置情報を保持する
    geopoint=null;
    // 位置情報検索に利用するための検索距離を指定する
    distance=0;
}

// 位置情報を地図(OpenStreetMap)に表示する
function writemap(lat,lon) {
    // 現在地の地図を表示
    map = new OpenLayers.Map("canvas");
    var mapnik = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);
    console.log(lat+":"+lon);
    var lonLat = new OpenLayers.LonLat(lon, lat)
                               .transform(
                                   new OpenLayers.Projection("EPSG:4326"), 
                                   new OpenLayers.Projection("EPSG:900913")
                                );
    map.setCenter(lonLat, 15);
    
    // 現在地にマーカーを立てる
    var markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    
    var marker = new OpenLayers.Marker(
        new OpenLayers.LonLat(lon, lat)
                      .transform(
                          new OpenLayers.Projection("EPSG:4326"), 
                          new OpenLayers.Projection("EPSG:900913")
        )
    );
    markers.addMarker(marker);
}