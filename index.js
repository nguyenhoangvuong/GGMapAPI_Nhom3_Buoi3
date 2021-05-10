// 
let map;
const buudien = { lat: 10.780026517140083,lng: 106.69987531437627 };
const quoctugiam = { lat: 21.029499687701918, lng:105.83270940424262 };
const radius = 13;
let buudienLL;
let quoctugiamLL;
var point1, point2, point3;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: buudien,
        zoom: 20,
    });
    const cirlebuudien = new google.maps.Circle({
        strokeColor: "##FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: buudien,
        radius,
    });

    const cirlequoctugiam = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: quoctugiam,
        radius,
    });

    buudienLL = new google.maps.LatLng(buudien.lat, buudien.lng);
    point1 = google.maps.geometry.spherical.computeOffset(buudienLL, radius * 2, 120);
    point2 = google.maps.geometry.spherical.computeOffset(buudienLL, radius * 2, 0);
    point3 = google.maps.geometry.spherical.computeOffset(buudienLL, radius * 2, -120);

    const buudien_Ngoaitiep = new google.maps.Polygon({
        path: [point1, point2, point3],
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map
    });

    quoctugiamLL = new google.maps.LatLng(quoctugiam.lat, quoctugiam.lng);
    point1 = google.maps.geometry.spherical.computeOffset(quoctugiamLL, radius * 2, 120);
    point2 = google.maps.geometry.spherical.computeOffset(quoctugiamLL, radius * 2, 0);
    point3 = google.maps.geometry.spherical.computeOffset(quoctugiamLL, radius * 2, -120);

    const quoctugiam_Ngoaitiep = new google.maps.Polygon({
        path: [point1, point2, point3],
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map
    });

    point1 = google.maps.geometry.spherical.computeOffset(buudienLL, radius, 120);
    point2 = google.maps.geometry.spherical.computeOffset(buudienLL, radius, 0);
    point3 = google.maps.geometry.spherical.computeOffset(buudienLL, radius, -120);

    const buudien_Noitiep = new google.maps.Polygon({
        path: [point1, point2, point3],
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map
    });

    point1 = google.maps.geometry.spherical.computeOffset(quoctugiamLL, radius, 120);
    point2 = google.maps.geometry.spherical.computeOffset(quoctugiamLL, radius, 0);
    point3 = google.maps.geometry.spherical.computeOffset(quoctugiamLL, radius, -120);

    const quoctugiam_Noitiep = new google.maps.Polygon({
        path: [point1, point2, point3],
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map
    });
    addMarkers();
    directionsService();
}

function addMarkers() {
    let postMarker = new google.maps.Marker({
        position: buudien,
        map
    });
    let quoctugiamMarker = new google.maps.Marker({
        position: quoctugiam,
        map
    });
    //info windows
    const buudien_Info_Windows = new google.maps.InfoWindow({
        content: "Bưu Điện Trung Tâm Thành Phố HCM",
        position: buudien,
    });
    const quoctugiam_Info_Windows = new google.maps.InfoWindow({
        content: "Văn Miếu Quốc Tử Giám HN",
        position: quoctugiam,
    });
    //event click show info
    postMarker.addListener('click', () => {
        buudien_Info_Windows.open(map);
    });

    quoctugiamMarker.addListener('click', () => {
        quoctugiam_Info_Windows.open(map);
    });
}

//Direct buudien -> quoctugiam
function directionsService() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    // document.getElementById("mode").addEventListener("change", () => {
    //     calculateAndDisplayRoute(directionsService, directionsRenderer);
    // });

    directionsRenderer.setMap(map);
    directionsService.route(
        {
            origin: buudienLL,
            destination: quoctugiamLL,
            travelMode: google.maps.TravelMode.WALKING
        },

        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Error " + status);
            }
        }
    );
}