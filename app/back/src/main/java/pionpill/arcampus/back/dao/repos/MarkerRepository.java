package pionpill.arcampus.back.dao.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pionpill.arcampus.back.dao.entity.Marker;

public interface MarkerRepository extends JpaRepository<Marker, Long> {
    List<Marker> findAllByLonBetweenAndLatBetween(Float minLon, Float maxLon, Float minLat, Float maxLat);

    List<Marker> findAllByMarkerType(String markerType);
}
