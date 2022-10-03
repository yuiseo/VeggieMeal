package com.veggiemeal.api.service.deal;

import com.veggiemeal.api.domain.dto.deal.DealDto;
import com.veggiemeal.api.domain.entity.Deal;
import com.veggiemeal.api.repository.DealRepository;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DealServiceImpl implements DealService{

    private final DealRepository dealRepository;

    public DealServiceImpl(DealRepository dealRepository){
        this.dealRepository = dealRepository;
    }

    @Override
    public List<String> getLarge() {
        List<String> largeList = dealRepository.findLarge();
        return largeList;
    }

    @Override
    public List<String> getMedium(String large) {
        List<String> mediumList = dealRepository.findMedium(large);
        return mediumList;
    }

    @Override
    public List<String> getSmall(String medium, String large) {
        List<String> smallList = dealRepository.findSmall(large, medium);
        return smallList;
    }

    @Override
    public List<String> getOrigin(String large, String medium, String small) {
        List<String> originList = dealRepository.findOrigin(large, medium, small);
        return originList;
    }

    @Override
    public List<DealDto> getDeal(String large, String medium, String small, String origin) {
        // 선택된 데이터에 대한 전체 EntityList
//        List<Deal> dealList = dealRepository.findByLargeAndMediumAndSmallAndOrigin(large, medium, small, origin);
        // 전체 EntityList를 DtoList로 변환
//        List<DealDto> dealDtoList = dealList.stream().map(entity -> DealDto.of(entity)).collect(Collectors.toList());
        // 날짜를 비교하여 최종적으로 반환할 DtoList
        List<DealDto> returnList = new ArrayList<>();

        List<String> dealDateList = dealRepository.findDealDateLimit7();

        for(String dealDate : dealDateList){
            List<Deal> dealList = dealRepository.findByLargeAndMediumAndSmallAndOriginAndDealDate(large, medium, small, origin, dealDate);

//            for(Deal deal : dealList){
//                deal.
//            }

            returnList.addAll(dealList.stream().map(entity -> DealDto.of(entity)).collect(Collectors.toList()));
        }


//        // Date type으로 캐스팅 시 ParseException 발생 가능하므로 예외처리
//        try{
//            // 현재 날짜를 yyyy-MM-dd로 생성
//            String todayStr = new SimpleDateFormat("yyyy-MM-dd").format(new Date(System.currentTimeMillis()));
//            // yyyy-MM-dd 포맷 설정
//            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//            // 현재 날짜를 포맷에 맞게 변경
//            Date today = dateFormat.parse(todayStr);
//
//            for(DealDto deal : dealDtoList){
//                // Dto에서 경매 날짜 추출
//                String dealDateStr = deal.getDealDate();
//                // yyyyMMdd 형식의 경매날짜를 yyyy-MM-dd 형태의 문자열로 변경
//                StringBuffer sb = new StringBuffer();
//                sb.append(dealDateStr);
//                sb.insert(4, "-");
//                sb.insert(7, "-");
//                dealDateStr = sb.toString();
//                // 경매 날짜를 포맷에 맞게 변경
//                Date dealDate = dateFormat.parse(dealDateStr);
//
//                // Date로 변환된 현재 날짜와 경매 날짜의 차이를 계산
//                long calDate = today.getTime() - dealDate.getTime();
//                // 계산결과가 초 단위로 나오기 때문에 일 단위로 변환
//                long calDateDays = calDate / (24 * 60 * 60 * 1000);
//                calDateDays = Math.abs(calDateDays);
//
//                // 차이가 7일 이하일 경우 returnList에 추가
//                if(calDateDays <= 7){
//                    returnList.add(deal);
//                }
//            }
//        } catch (ParseException e){
//            return returnList;
//        }

        return returnList;
    }
}
