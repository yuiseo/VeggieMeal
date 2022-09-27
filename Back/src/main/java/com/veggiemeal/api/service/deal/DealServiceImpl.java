package com.veggiemeal.api.service.deal;

import com.veggiemeal.api.domain.dto.deal.DealDto;
import com.veggiemeal.api.domain.entity.Deal;
import com.veggiemeal.api.repository.DealRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DealServiceImpl implements DealService{

    private final DealRepository dealRepository;

    public DealServiceImpl(DealRepository dealRepository){
        this.dealRepository = dealRepository;
    }

    @Override
    public List<DealDto> getDeal(String large, String medium, String small, String origin) {
        List<Deal> dealList = dealRepository.findByLargeAndMediumAndSmallAndOrigin(large, medium, small, origin);
        List<DealDto> dealDtoList = dealList.stream().map(entity -> DealDto.of(entity)).collect(Collectors.toList());
        return dealDtoList;
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
}
