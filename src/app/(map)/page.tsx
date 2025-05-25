"use client";

import { Accordion, Box, Flex, Heading } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useLayerGroupItems } from "../../components/custom/LayerGroupItemProvider";
import { MapMenu } from "../../components/custom/MapMenu";
import { Toaster } from "../../components/ui/toaster";
import { useLayers } from "../../hooks/useLayers";
import { useMapDems } from "../../hooks/useMapDems";
import { useMapStyles } from "../../hooks/useMapStyles";
import { usePointCloud } from "../../hooks/usePointCloud";

const MapComponent = dynamic(() => import("../../components/custom/MapComponent").then((mod) => mod.MapComponent), {
    ssr: false,
});

export default function Page() {
    const { mapStyles, selectedMapStyle, setSelectedMapStyle, handleStyleUploaded, handleStyleDeleted } = useMapStyles();
    const {
        mapDemSources,
        selectedDemSource,
        setSelectedDemSource,
        shadowOpacity,
        setShadowOpacity,
        enableTerrain,
        setEnableTerrain,
        demTints,
        colorOpacity,
        setColorOpacity,
        setDemTints,
        enableShadow,
        setEnableShadow,
        enableColor,
        setEnableColor,
    } = useMapDems();
    const { enablePointCloud, setEnablePointCloud } = usePointCloud();
    const layerGroupItems = useLayerGroupItems();
    const { activeLayerSets, toggleActiveLayerSet, setActiveLayerSets } = useLayers({ layerGroupItems });

    return (
        <Flex height="100dvh" w="100%" position="relative">
            <Box position="absolute" px={4} m={2} top={0} left={0} w={350} bg="bg" borderRadius="md" zIndex={100} boxShadow="md">
                <Accordion.Root variant="plain" collapsible defaultValue={["menu"]}>
                    <Accordion.Item value="menu">
                        <Accordion.ItemTrigger justifyContent="space-between" py="7px">
                            <Heading>点群タイル閲覧サイト 試験公開</Heading>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent maxH="calc(100dvh - 62px)" overflowY="auto" scrollbar="hidden">
                            <Accordion.ItemBody>
                                <MapMenu
                                    styles={mapStyles}
                                    selectedStyle={selectedMapStyle}
                                    onStyleSelected={setSelectedMapStyle}
                                    onStyleUploaded={handleStyleUploaded}
                                    onStyleDeleted={handleStyleDeleted}
                                    demSources={mapDemSources}
                                    selectedDemSource={selectedDemSource}
                                    onDemSelected={setSelectedDemSource}
                                    shadowOpacity={shadowOpacity}
                                    onShadowOpacityChange={setShadowOpacity}
                                    enableTerrain={enableTerrain}
                                    onEnableTerrainChange={setEnableTerrain}
                                    colorOpacity={colorOpacity}
                                    onColorOpacityChange={setColorOpacity}
                                    demTints={demTints}
                                    onDemTintsChange={setDemTints}
                                    enablePointCloud={enablePointCloud}
                                    onEnablePointCloudChange={setEnablePointCloud}
                                    layerGroupItems={layerGroupItems}
                                    activeLayerSets={activeLayerSets}
                                    toggleActiveLayerSet={toggleActiveLayerSet}
                                    setActiveLayerSets={setActiveLayerSets}
                                    enableShadow={enableShadow}
                                    onEnableShadowChange={setEnableShadow}
                                    enableColor={enableColor}
                                    onEnableColorChange={setEnableColor}
                                />
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                </Accordion.Root>
            </Box>
            <MapComponent
                mapStyle={selectedMapStyle.style}
                mapDemSource={selectedDemSource}
                shadowOpacity={shadowOpacity}
                enableTerrain={enableTerrain}
                demTints={demTints}
                colorOpacity={colorOpacity}
                enablePointCloud={enablePointCloud}
                activeLayerSets={activeLayerSets}
                enableShadow={enableShadow}
                enableColor={enableColor}
            />
            <Toaster />
        </Flex>
    );
}
