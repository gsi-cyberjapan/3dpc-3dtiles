import {
    Button,
    Code,
    ColorPicker,
    ColorPickerChannelSlider,
    ColorSwatch,
    Dialog,
    Field,
    HStack,
    IconButton,
    Input,
    parseColor,
    Portal,
    Spacer,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { MapDemTint } from "../../hooks/useMapDems";

interface MapTintItemProps {
    tint: MapDemTint;
    colorOpacity: number;
    onChange: (_tint: MapDemTint) => void;
    onDelete: () => void;
}

export const MapTintItem = ({ tint, colorOpacity, onChange, onDelete }: MapTintItemProps) => {
    const [tempFrom, setTempFrom] = useState(tint.from.toString());
    const [tempColor, setTempColor] = useState(parseColor(`rgba(${tint.color.join(",")}, ${colorOpacity})`));
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleSave = () => {
        onChange({
            ...tint,
            from: parseInt(tempFrom),
            color: [tempColor.getChannelValue("red"), tempColor.getChannelValue("green"), tempColor.getChannelValue("blue")],
        });
        setDialogOpen(false);
    };

    return (
        <HStack w="100%" pr={1}>
            <Code>{tint.from} m~</Code>
            <Spacer />
            <IconButton colorPalette="red" onClick={onDelete} variant="outline" size="2xs" aria-label={`色彩削除 ${tint.from}m~`}>
                <LuTrash2 />
            </IconButton>
            <Dialog.Root placement="center" open={dialogOpen} onOpenChange={(e) => setDialogOpen(e.open)} closeOnInteractOutside={false}>
                <Dialog.Trigger asChild>
                    <IconButton variant="outline" size="2xs" aria-label={`色彩編集 ${tint.from}m~`}>
                        <LuPencil />
                    </IconButton>
                </Dialog.Trigger>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content m={2}>
                        <Dialog.Header>
                            <Dialog.Title>色彩の編集</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Stack>
                                <Field.Root>
                                    <Field.Label>標高（m）</Field.Label>
                                    <Input
                                        type="number"
                                        min={-9999}
                                        max={9999}
                                        value={tempFrom}
                                        onChange={(e) => setTempFrom(e.target.value)}
                                    />
                                </Field.Root>
                                <ColorPicker.Root maxW={200} value={tempColor} onValueChange={(e) => setTempColor(e.value)}>
                                    <ColorPicker.HiddenInput />
                                    <ColorPicker.Label>色彩</ColorPicker.Label>
                                    <ColorPicker.Control>
                                        <ColorPicker.Input />
                                        <ColorPicker.Trigger />
                                    </ColorPicker.Control>
                                    <Portal>
                                        <ColorPicker.Positioner>
                                            <ColorPicker.Content>
                                                <ColorPicker.Area />
                                                <HStack>
                                                    <ColorPicker.EyeDropper size="xs" variant="outline" />
                                                    <ColorPickerChannelSlider channel="hue" />
                                                </HStack>
                                            </ColorPicker.Content>
                                        </ColorPicker.Positioner>
                                    </Portal>
                                </ColorPicker.Root>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">キャンセル</Button>
                            </Dialog.ActionTrigger>
                            <Button disabled={!tempFrom || !tempColor} onClick={handleSave}>
                                保存
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>
            <ColorSwatch size="lg" value={`rgba(${tint.color.join(",")}, ${colorOpacity})`} />
        </HStack>
    );
};
