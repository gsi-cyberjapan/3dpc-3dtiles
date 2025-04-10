"use client";

import {
    Accordion,
    Box,
    Center,
    ClientOnly,
    Collapsible,
    EmptyState,
    Field,
    Heading,
    HStack,
    Skeleton,
    Slider,
    Stack,
    Switch,
    VStack,
} from "@chakra-ui/react";
import { LuMap } from "react-icons/lu";
import { LayerGroupItem, LayerSet } from "../../hooks/useLayers";
import { MapDem, MapDemTint } from "../../hooks/useMapDems";
import { MapStyle } from "../../hooks/useMapStyles";
import { ColorModeButton } from "../ui/color-mode";
import { MapDemSelector } from "./MapDemSelector";
import { MapLayerSelector } from "./MapLayerSelector";
import { MapSelectedLayerList } from "./MapSelectedLayerList";
import { MapStyleSelector } from "./MapStyleSelector";
import { MapTintList } from "./MapTintList";

interface MapMenuProps {
    styles: MapStyle[];
    selectedStyle: MapStyle | undefined;
    onStyleSelected: (_style: MapStyle) => void;
    onStyleUploaded: (_style: MapStyle) => void;
    onStyleDeleted: (_style: MapStyle) => void;
    demSources: MapDem[];
    selectedDemSource: MapDem | undefined;
    onDemSelected: (_dem: MapDem) => void;
    shadowOpacity: number;
    onShadowOpacityChange: (_shadowOpacity: number) => void;
    enableTerrain: boolean;
    onEnableTerrainChange: (_enableTerrain: boolean) => void;
    colorOpacity: number;
    onColorOpacityChange: (_colorOpacity: number) => void;
    demTints: MapDemTint[];
    onDemTintsChange: (_demTints: MapDemTint[]) => void;
    enablePointCloud: boolean;
    onEnablePointCloudChange: (_enablePointCloud: boolean) => void;
    layerGroupItems: LayerGroupItem[];
    activeLayerSets: LayerSet[];
    toggleActiveLayerSet: (_id: string) => void;
    setActiveLayerSets: (_activeLayerSets: LayerSet[]) => void;
    enableShadow: boolean;
    onEnableShadowChange: (_enableShadow: boolean) => void;
    enableColor: boolean;
    onEnableColorChange: (_enableColor: boolean) => void;
}

export const MapMenu = ({
    styles,
    selectedStyle,
    onStyleSelected,
    onStyleUploaded,
    onStyleDeleted,
    demSources,
    selectedDemSource,
    onDemSelected,
    shadowOpacity,
    onShadowOpacityChange,
    enableTerrain,
    onEnableTerrainChange,
    colorOpacity,
    onColorOpacityChange,
    demTints,
    onDemTintsChange,
    enablePointCloud,
    onEnablePointCloudChange,
    layerGroupItems,
    activeLayerSets,
    toggleActiveLayerSet,
    setActiveLayerSets,
    enableShadow,
    onEnableShadowChange,
    enableColor,
    onEnableColorChange,
}: MapMenuProps) => {
    return (
        <Stack w="100%" h="100%" gap={4}>
            <Stack>
                <Heading size="sm">ベースマップ</Heading>
                <MapStyleSelector
                    styles={styles}
                    selectedStyle={selectedStyle}
                    onStyleSelected={onStyleSelected}
                    onStyleUploaded={onStyleUploaded}
                    onStyleDeleted={onStyleDeleted}
                />
            </Stack>
            <Stack gap={0}>
                <Heading size="sm">標高タイル</Heading>
                <Field.Root orientation="horizontal" px={1} mb="0.5rem">
                    <Field.Label>ソース</Field.Label>
                    <MapDemSelector demSources={demSources} selectedDemSource={selectedDemSource} onDemSelected={onDemSelected} />
                </Field.Root>
                <Field.Root orientation="horizontal" px={1} mb="0.5rem">
                    <Field.Label>立体表示</Field.Label>
                    <Switch.Root px={1} checked={enableTerrain} onCheckedChange={(e) => onEnableTerrainChange(e.checked)}>
                        <Switch.HiddenInput aria-label="立体表示" />
                        <Switch.Control>
                            <Switch.Thumb />
                        </Switch.Control>
                    </Switch.Root>
                </Field.Root>
                <Field.Root orientation="horizontal" px={1} mb="0.5rem">
                    <Field.Label>陰影表示</Field.Label>
                    <Switch.Root px={1} checked={enableShadow} onCheckedChange={(e) => onEnableShadowChange(e.checked)}>
                        <Switch.HiddenInput aria-label="陰影表示" />
                        <Switch.Control>
                            <Switch.Thumb />
                        </Switch.Control>
                    </Switch.Root>
                </Field.Root>
                <Collapsible.Root open={enableShadow}>
                    <Collapsible.Content>
                        <Field.Root orientation="horizontal" px={1} mb="0.5rem">
                            <Field.Label>透過率</Field.Label>
                            <Slider.Root
                                size="sm"
                                px={1}
                                w={180}
                                max={1}
                                step={0.02}
                                value={[shadowOpacity]}
                                onValueChange={(e) => onShadowOpacityChange(e.value[0])}
                            >
                                <Slider.Control>
                                    <Slider.Track>
                                        <Slider.Range />
                                    </Slider.Track>
                                    <Slider.Thumbs />
                                </Slider.Control>
                            </Slider.Root>
                        </Field.Root>
                    </Collapsible.Content>
                </Collapsible.Root>
                <Field.Root orientation="horizontal" px={1} mb="0.5rem">
                    <Field.Label>段彩表示</Field.Label>
                    <Switch.Root px={1} checked={enableColor} onCheckedChange={(e) => onEnableColorChange(e.checked)}>
                        <Switch.HiddenInput aria-label="段彩表示" />
                        <Switch.Control>
                            <Switch.Thumb />
                        </Switch.Control>
                    </Switch.Root>
                </Field.Root>
                <Collapsible.Root open={enableColor}>
                    <Collapsible.Content>
                        <Field.Root orientation="horizontal" px={1} mb="0.5rem">
                            <Field.Label>透過率</Field.Label>
                            <Slider.Root
                                size="sm"
                                px={1}
                                w={180}
                                max={1}
                                step={0.02}
                                value={[colorOpacity]}
                                onValueChange={(e) => onColorOpacityChange(e.value[0])}
                            >
                                <Slider.Control>
                                    <Slider.Track>
                                        <Slider.Range />
                                    </Slider.Track>
                                    <Slider.Thumbs />
                                </Slider.Control>
                            </Slider.Root>
                        </Field.Root>
                        <Accordion.Root variant="plain" collapsible px={1} mb="0.5rem">
                            <Accordion.Item value="color">
                                <Accordion.ItemTrigger fontSize="sm" w="100%" py={0} justifyContent="space-between">
                                    設定
                                    <Accordion.ItemIndicator />
                                </Accordion.ItemTrigger>
                                <Accordion.ItemContent>
                                    <Accordion.ItemBody pb={0}>
                                        <MapTintList tints={demTints} colorOpacity={colorOpacity} onChange={onDemTintsChange} />
                                    </Accordion.ItemBody>
                                </Accordion.ItemContent>
                            </Accordion.Item>
                        </Accordion.Root>
                    </Collapsible.Content>
                </Collapsible.Root>
            </Stack>
            <Stack>
                <Heading size="sm">点群</Heading>
                <Field.Root orientation="horizontal" px={1}>
                    <Field.Label>表示</Field.Label>
                    <Switch.Root px={1} checked={enablePointCloud} onCheckedChange={(e) => onEnablePointCloudChange(e.checked)}>
                        <Switch.HiddenInput aria-label="点群表示" />
                        <Switch.Control>
                            <Switch.Thumb />
                        </Switch.Control>
                    </Switch.Root>
                </Field.Root>
            </Stack>
            <Stack>
                <Heading size="sm">レイヤー</Heading>
                <Box px={1}>
                    <MapLayerSelector
                        layerGroupItems={layerGroupItems}
                        activeLayerSets={activeLayerSets}
                        toggleActiveLayerSet={toggleActiveLayerSet}
                    />
                </Box>
            </Stack>
            <Stack>
                <Heading size="sm">選択中のレイヤー</Heading>
                {activeLayerSets.length === 0 ? (
                    <Center>
                        <EmptyState.Root>
                            <EmptyState.Content>
                                <EmptyState.Indicator>
                                    <LuMap />
                                </EmptyState.Indicator>
                                <VStack textAlign="center">
                                    <EmptyState.Title fontSize="xs">選択中のレイヤーがありません</EmptyState.Title>
                                    <EmptyState.Description fontSize="xs">
                                        レイヤーセクションから表示するレイヤーを選択してください
                                    </EmptyState.Description>
                                </VStack>
                            </EmptyState.Content>
                        </EmptyState.Root>
                    </Center>
                ) : (
                    <MapSelectedLayerList activeLayerSets={activeLayerSets} onChange={setActiveLayerSets} />
                )}
            </Stack>
            <HStack h={6} px={1}>
                <ClientOnly fallback={<Skeleton />}>
                    <ColorModeButton size="2xs" />
                </ClientOnly>
            </HStack>
        </Stack>
    );
};
