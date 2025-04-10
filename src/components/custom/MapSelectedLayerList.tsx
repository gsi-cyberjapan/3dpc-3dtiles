import { HStack, IconButton, Slider, Stack, Text } from "@chakra-ui/react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LuGripVertical, LuTrash2 } from "react-icons/lu";
import { LayerSet } from "../../hooks/useLayers";

interface MapSelectedLayerListProps {
    activeLayerSets: LayerSet[];
    onChange: (_activeLayerSets: LayerSet[]) => void;
}

export const MapSelectedLayerList = ({ activeLayerSets, onChange }: MapSelectedLayerListProps) => {
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = activeLayerSets.findIndex((set) => set.id === active.id);
            const newIndex = activeLayerSets.findIndex((set) => set.id === over?.id);
            const newLayerSets = [...activeLayerSets];
            const [removed] = newLayerSets.splice(oldIndex, 1);
            newLayerSets.splice(newIndex, 0, removed);
            onChange(newLayerSets);
        }
    };
    const handleChange = (layerSet: LayerSet) => {
        const newLayerSets = activeLayerSets.map((set) => (set.id === layerSet.id ? layerSet : set));
        onChange(newLayerSets);
    };
    const handleRemove = (layerSet: LayerSet) => {
        const newLayerSets = activeLayerSets.filter((set) => set.id !== layerSet.id);
        onChange(newLayerSets);
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={activeLayerSets.toReversed()} strategy={verticalListSortingStrategy}>
                <Stack>
                    {activeLayerSets.toReversed().map((layerSet) => (
                        <MapSelectedLayerListItem key={layerSet.id} layerSet={layerSet} onChange={handleChange} onRemove={handleRemove} />
                    ))}
                </Stack>
            </SortableContext>
        </DndContext>
    );
};

interface MapSelectedLayerListItemProps {
    layerSet: LayerSet;
    onChange: (_activeLayerSet: LayerSet) => void;
    onRemove: (_layerSet: LayerSet) => void;
}

const MapSelectedLayerListItem = ({ layerSet, onChange, onRemove }: MapSelectedLayerListItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: layerSet.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
    };

    return (
        <HStack ref={setNodeRef} style={style} w="100%" gap={1} borderColor="border" borderWidth={1} borderRadius="md" p={1}>
            <IconButton aria-label={`Drag handle ${layerSet.title}`} variant="ghost" size="sm" {...attributes} {...listeners}>
                <LuGripVertical />
            </IconButton>
            <Stack w="100%" gap={1}>
                <Text fontSize="sm">{layerSet.title}</Text>
                <HStack w="100%" justifyContent="space-between">
                    <Slider.Root
                        size="sm"
                        flexShrink={0}
                        w="80%"
                        max={1}
                        step={0.02}
                        value={[layerSet.opacity]}
                        onValueChange={(e) => onChange({ ...layerSet, opacity: e.value[0] })}
                    >
                        <Slider.Control>
                            <Slider.Track>
                                <Slider.Range />
                            </Slider.Track>
                            <Slider.Thumbs />
                        </Slider.Control>
                    </Slider.Root>
                    <IconButton
                        colorPalette="red"
                        variant="outline"
                        size="2xs"
                        onClick={() => onRemove(layerSet)}
                        aria-label={`削除 ${layerSet.title}`}
                    >
                        <LuTrash2 />
                    </IconButton>
                </HStack>
            </Stack>
        </HStack>
    );
};
