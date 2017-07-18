(function(){
    var pc = {};
    pc.storage = window.localStorage;
    

    function getInputFields(){
        pc.name = $('#name');
        pc.age = $('#age');
        pc.email = $('#email');
        pc.pwd = $('#pwd');
        pc.rem = $('#rem');
        pc.phone = $('#phone');
        pc.latitude = $('#latitude');
        pc.longitude = $('#longitude');
        pc.addr = $('#addr');

        setTimeout(loadData,0);
    }
    function loadData(){
         
        if(pc.storage.userInfo){
            var data = JSON.parse(pc.storage.getItem("userInfo"));
            pc.name.val(data.name);
            pc.pwd.val(data.pwd);
        }
    }
    function submitData(e){
         
        if(pc.rem.is(':checked')){
            var userInfo = {};
            userInfo.name = pc.name.val();
            userInfo.pwd = pc.pwd.val();
            pc.storage.setItem('userInfo',JSON.stringify(userInfo));
        }
        else{
            if(pc.storage.userInfo){
                pc.storage.removeItem('userInfo');
            }
        }
        e.preventDefault();
        return false;
    }
    function init(){
        $(document).ready(getInputFields);
        $('#userdetails').submit(submitData);
    }
    init();
})();

 function initMap(){
    navigator.geolocation.getCurrentPosition(geo_success,geo_error);
    var geocoder = new google.maps.Geocoder;
    function geo_success(position){
        var lat = document.getElementById("latitude");
        var lng = document.getElementById("longitude");

        lat.value = position.coords.latitude;
        lng.value = position.coords.longitude;
        geocodeLatLng(geocoder);
    }
    function geo_error(err){
        console.log(err.code.toString()+err.message);
    }
    function geocodeLatLng(geocoder){
        var lat = document.getElementById("latitude");
        var lng = document.getElementById("longitude");

        var latlng = {lat: parseFloat(lat.value), lng: parseFloat(lng.value)};

        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                if (results[1]) {				              
                    $('#addr').val(results[1].formatted_address);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }        
    
}