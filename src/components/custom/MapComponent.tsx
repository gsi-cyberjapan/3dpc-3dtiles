"use client";

import { Center, HStack, useBreakpointValue } from "@chakra-ui/react";
import maplibregl from "maplibre-gl";
import { getGsiDemProtocolAction } from "maplibre-gl-gsi-terrain";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/modern.css";
import dynamic from "next/dynamic";
import { Protocol } from "pmtiles";
import { IconContext } from "react-icons";
import { LuPlus } from "react-icons/lu";
import Map, { GeolocateControl, ImmutableLike, Layer, NavigationControl, ScaleControl, Source } from "react-map-gl/maplibre";
import setting from "../../../public/setting.json";
import { useDem2ReliefProtocol } from "../../hooks/useDem2ReliefProtocol";
import { LayerSet } from "../../hooks/useLayers";
import { MapDem, MapDemTint } from "../../hooks/useMapDems";
import { CenterInfoPopover } from "./CenterInfoPopover";
import { MapTestSupporter } from "./MapTestSupporter";
import { SearchInput } from "./SearchInput";

const PointCloudOverlay = dynamic(() => import("./PointCloudOverlay").then((mod) => mod.PointCloudOverlay), { ssr: false });

maplibregl.addProtocol("pmtiles", new Protocol().tile);
maplibregl.addProtocol("gsidem", getGsiDemProtocolAction("gsidem"));

export interface MapAltitudeColor {
    altitudeMax: number;
    color: [number, number, number];
    label: string;
}

interface MapComponentProps {
    mapStyle: string | maplibregl.StyleSpecification | ImmutableLike<maplibregl.StyleSpecification>;
    mapDemSource: MapDem;
    shadowOpacity: number;
    enableTerrain: boolean;
    demTints: MapDemTint[];
    colorOpacity: number;
    enablePointCloud: boolean;
    activeLayerSets: LayerSet[];
    enableShadow: boolean;
    enableColor: boolean;
}

export const MapComponent = ({
    mapStyle,
    mapDemSource,
    shadowOpacity,
    enableTerrain,
    demTints,
    colorOpacity,
    enablePointCloud,
    activeLayerSets,
    enableShadow,
    enableColor,
}: MapComponentProps) => {
    useDem2ReliefProtocol({
        demSourceKey: mapDemSource.id,
        colorMaps: demTints,
    });

    return (
        <Map
            initialViewState={{
                longitude: 140.084556,
                latitude: 36.104611,
                zoom: 4,
            }}
            style={{ width: "100%", height: "100%" }}
            hash={true}
            minZoom={4}
            mapStyle={mapStyle}
            attributionControl={{
                compact: true,
                customAttribution: setting.attribution,
            }}
            terrain={{
                source: "terrain",
                exaggeration: enableTerrain ? 1 : 0,
            }}
        >
            <NavigationControl visualizePitch={true} position={useBreakpointValue({ base: "bottom-right", md: "top-right" })} />
            <ScaleControl />
            <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
                position={useBreakpointValue({ base: "bottom-right", md: "top-right" })}
            />

            {/* 標高タイル(影 & 立体) */}
            <Source
                id="terrain"
                type="raster-dem"
                key={`${mapDemSource.id}-terrain`}
                tiles={[mapDemSource.url]}
                maxzoom={mapDemSource.maxZoom}
                encoding={mapDemSource.encoding}
                attribution={mapDemSource.attribution}
                tileSize={mapDemSource.tileSize}
            >
                {enableShadow && <Layer type="hillshade" paint={{ "hillshade-exaggeration": shadowOpacity }} />}
            </Source>

            {/* 標高タイル(色) */}
            {enableColor && (
                <Source
                    id="color"
                    key={`${JSON.stringify(demTints)}-${mapDemSource.id}`}
                    type="raster"
                    maxzoom={mapDemSource.maxZoom}
                    tiles={mapDemSource.tiles}
                    attribution={mapDemSource.attribution}
                    tileSize={mapDemSource.tileSize}
                >
                    <Layer type="raster" paint={{ "raster-opacity": colorOpacity }} />
                </Source>
            )}

            {/* 点群 */}
            {enablePointCloud && <PointCloudOverlay />}

            {/* レイヤー */}
            {activeLayerSets.toReversed().map((layerSet, index) => (
                <Source key={layerSet.id} {...layerSet.source}>
                    {layerSet.layer.type === "fill" && (
                        <Layer
                            key={`${layerSet.id}-fill`}
                            {...layerSet.layer}
                            paint={{ "fill-opacity": layerSet.opacity }}
                            beforeId={index === 0 ? undefined : activeLayerSets.toReversed()[index - 1]?.id}
                        />
                    )}
                    {layerSet.layer.type === "raster" && (
                        <Layer
                            key={`${layerSet.id}-raster`}
                            {...layerSet.layer}
                            paint={{ "raster-opacity": layerSet.opacity }}
                            beforeId={index === 0 ? undefined : activeLayerSets.toReversed()[index - 1]?.id}
                        />
                    )}
                </Source>
            ))}

            {/* 検索ボックス & 情報ポップオーバー */}
            <HStack
                position="absolute"
                top={useBreakpointValue({ base: "60px", md: "8px" })}
                left={useBreakpointValue({ base: "8px", md: "366px" })}
                borderRadius="md"
                zIndex={10}
            >
                <SearchInput />
                <CenterInfoPopover />
            </HStack>

            {/* 中心点 */}
            <Center position="absolute" top={0} left={0} w="100%" h="100%" pointerEvents="none">
                <IconContext.Provider value={{ size: "36px", color: "black" }}>
                    <LuPlus />
                </IconContext.Provider>
            </Center>
            <MapTestSupporter />
        </Map>
    );
};
