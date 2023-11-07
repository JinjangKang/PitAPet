var map;

function initMap() {
    // 네이버 지도 생성
    map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.5665, 126.978), // 초기 중심 좌표 (서울)
        zoom: 12, // 초기 확대 수준
    });

    // 현재 위치 가져오기lo
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            // 현재 위치로 지도 이동
            map.setCenter(new naver.maps.LatLng(lat, lng));

            // 주변 동물병원 마커 표시
            showAnimalHospitals(lat, lng);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showAnimalHospitals(lat, lng) {
    // 주변 동물병원 검색을 위한 URL 생성
    var apiUrl =
        'https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query=동물병원&coordinate=' + lng + ',' + lat;

    // AJAX를 사용하여 API 호출
    $.ajax({
        url: apiUrl,
        method: 'GET',
        headers: {
            'X-NCP-APIGW-API-KEY-ID': 'kmzsuh19wt',
            'X-NCP-APIGW-API-KEY': 'DARp2YP0JqRuGgNpxnVz9bUpGO2L4YWwZUoaAwiB',
        },
        success: function (data) {
            // 검색 결과를 반복하며 마커 표시
            for (var i = 0; i < data.places.length; i++) {
                var place = data.places[i];
                var marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(place.y, place.x),
                    map: map,
                    title: place.name,
                });
            }
        },
        error: function (error) {
            console.error('Error fetching animal hospitals:', error);
        },
    });
}
