import styles from 'styles/MartMap.module.scss';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import Head from "next/head";
import MapModal from 'components/MapModal';

export default function MartMap(){
    const router = useRouter();
    const [martList, setMartList] = useState<[{[key:number]:{}}]>();
    const [userAddress, setUserAddress] = useState<string[] | undefined>();
    const [isShow, setIsShow] = useState<boolean>(true);
    const [selectedMart, setSelectedMart] = useState<{[key:string]:string}>();
    
    let map:any;
    let mart:string;
    if(router.query.id === 'emart'){
      mart = "이마트"
    }else{
      mart = "홈플러스"
    }

    function moveMyGps() {
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude; // 위도
            let lon = position.coords.longitude; // 경도
            let locPosition = new window.kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            // 지도 중심좌표를 접속위치로 변경합니다
            makeMap(lat, lon);
            toAddress(lat, lon);
          });
        }
      }
    
    function toAddress(lat:number, lon:number){
      let geocoder = new window.kakao.maps.services.Geocoder();
      let coord = new window.kakao.maps.LatLng(lat, lon);
      let callback = function(result:any, status:any) {
          if (status === window.kakao.maps.services.Status.OK) {
            setUserAddress([result[0]['address']['region_1depth_name'], result[0]['address']['region_2depth_name'], result[0]['address']['region_3depth_name']])
          }
      }
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }

    function placesSearchCB (data:any, status:any) {
      if (status === window.kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          var bounds = new window.kakao.maps.LatLngBounds();
          const filtered_data = data.filter((item:any)=>item['category_group_code'] === 'MT1');
          setMartList(filtered_data)
          for (var i=0; i<filtered_data.length; i++) {
            displayMarker(filtered_data[i]);
            bounds.extend(new window.kakao.maps.LatLng(filtered_data[i].y, filtered_data[i].x));
          }
      }
  }

  function displayMarker(place:any) {
    var imageSrc =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    var imageSize = new window.kakao.maps.Size(20, 30);
    var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    // 마커를 생성하고 지도에 표시합니다
    var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
        image: markerImage
    });

    marker.setMap(map);
  }

    function makeMap(lat:number, lon:number) {
        let mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new window.kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
          };
        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        map = new window.kakao.maps.Map(mapContainer, mapOption);
        map.setDraggable(true);
        window.kakao.maps.event.addListener(map, "center_changed", function () {
          // 지도의  레벨을 얻어옵니다
          let level = map.getLevel();
          // 지도의 중심좌표를 얻어옵니다
          let locPosition = map.getCenter();
          map.setLevel(level);
          map.setCenter(locPosition);
          // toAddress(locPosition.getLat(), locPosition.getLng());
          SearchMart()
        })
      }

    function SearchMart(){
      var ps = new window.kakao.maps.services.Places();
      if(userAddress){
        ps.keywordSearch(`${mart} ${userAddress[0]} ${userAddress[1]}`, placesSearchCB)
      }
    }


      useEffect(()=>{
        window.kakao.maps.load(function(){moveMyGps()})
      }, [])

    useEffect(()=>{
      window.kakao.maps.load(function(){SearchMart()})
    }, [userAddress])

    useEffect(()=>{
      if(selectedMart){
        makeMap(Number(selectedMart['y']), Number(selectedMart['x']))
      }
    }, [selectedMart])

    return(
      <div className={styles.parents}>
      <Head>
        <title>{`내 주변 ${mart} | 베지밀`}</title>
      </Head>
      {isShow ? 
        <MapModal name={mart} data={martList} setSelectedMart={setSelectedMart} />
      :
      null
      }
        <div className={ isShow ? `${styles.toggle} ${styles.is_show}` : `${styles.toggle} ${styles.isnt_show}`}
        onClick={()=>{setIsShow(value => !value)}}
        style={{cursor: 'url("/cursor/pointer.png"), pointer'}}>
          <span className={styles.toggleBtn} style={{cursor: 'url("/cursor/pointer.png"), pointer'}}></span>
          {isShow ? 
          <span style={{cursor: 'url("/cursor/pointer.png"), pointer'}}>마트 목록 끄기</span>
        :  
          <span style={{cursor: 'url("/cursor/pointer.png"), pointer'}}>마트 목록 보기</span>
        }
        </div>
        <div id="map">
        </div>
      </div>
    )
}