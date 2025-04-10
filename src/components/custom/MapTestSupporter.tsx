import { installMapGrab } from "@mapgrab/map-interface";
import { useMap } from "react-map-gl/maplibre";

export const MapTestSupporter = () => {
    const { current } = useMap();
    const map = current?.getMap();
    if (map) {
        installMapGrab(map, "main");
    }
    return null;
};
