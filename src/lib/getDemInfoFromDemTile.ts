const dem1aUrl = "https://cyberjapandata.gsi.go.jp/xyz/dem1a_png/";
const dem5aUrl = "https://cyberjapandata.gsi.go.jp/xyz/dem5a_png/";
const dem5bUrl = "https://cyberjapandata.gsi.go.jp/xyz/dem5b_png/";
const dem5cUrl = "https://cyberjapandata.gsi.go.jp/xyz/dem5c_png/";
const dem10bUrl = "https://cyberjapandata.gsi.go.jp/xyz/dem_png/";
const tileExtension = ".png";

const longitudeToTileWithDecimal = (longitude: number, zoom: number): number => {
    return ((longitude + 180) / 360) * Math.pow(2, zoom);
};

const latitudeToTileWithDecimal = (latitude: number, zoom: number): number => {
    return (
        ((1 - Math.log(Math.tan((latitude * Math.PI) / 180) + 1 / Math.cos((latitude * Math.PI) / 180)) / Math.PI) / 2) * Math.pow(2, zoom)
    );
};

export const getDemInfoFromDemTile = async (longitude: number, latitude: number): Promise<string | null> => {
    const dem1aInfo = await getDemInfo(longitude, latitude, 17, dem1aUrl);
    if (dem1aInfo !== null) {
        return `標高: ${dem1aInfo.toFixed(1)}m (データソース: DEM1A)`;
    }
    const dem5aInfo = await getDemInfo(longitude, latitude, 15, dem5aUrl);
    if (dem5aInfo !== null) {
        return `標高: ${dem5aInfo.toFixed(1)}m (データソース: DEM5A)`;
    }
    const dem5bInfo = await getDemInfo(longitude, latitude, 15, dem5bUrl);
    if (dem5bInfo !== null) {
        return `標高: ${dem5bInfo.toFixed(1)}m (データソース: DEM5B)`;
    }
    const dem5cInfo = await getDemInfo(longitude, latitude, 15, dem5cUrl);
    if (dem5cInfo !== null) {
        return `標高: ${dem5cInfo.toFixed(1)}m (データソース: DEM5C)`;
    }
    const dem10bInfo = await getDemInfo(longitude, latitude, 14, dem10bUrl);
    if (dem10bInfo !== null) {
        return `標高: ${dem10bInfo.toFixed(0)}m (データソース: DEM10B)`;
    }
    return null;
};

const getDemInfo = async (longitude: number, latitude: number, zoom: number, baseUrl: string): Promise<number | null> => {
    const realX = longitudeToTileWithDecimal(longitude, zoom);
    const realY = latitudeToTileWithDecimal(latitude, zoom);
    const tileX = Math.floor(realX);
    const tileY = Math.floor(realY);
    const url = `${baseUrl}${zoom}/${tileX}/${tileY}${tileExtension}`;
    const response = await fetch(url);
    if (!response.ok) {
        return null;
    }
    const positionX = Math.ceil((realX - tileX) * 256);
    const positionY = Math.ceil((realY - tileY) * 256);
    const arrayBuffer = await response.arrayBuffer();
    const pixelColor = await getPixelColor(arrayBuffer, positionX, positionY);
    if (!pixelColor) {
        return null;
    }
    const [r, g, b, a] = pixelColor;
    const height = calcHeight(r, g, b, a);
    return height;
};

const getPixelColor = async (arrayBuffer: ArrayBuffer, positionX: number, positionY: number): Promise<number[] | null> => {
    const blob = new Blob([arrayBuffer], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.src = url;

    await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Image loading error"));
    });

    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return null;
    }
    ctx.drawImage(image, 0, 0);

    const pixelData = ctx.getImageData(positionX - 1, positionY - 1, 1, 1).data;
    const [r, g, b, a] = pixelData;

    return [r, g, b, a];
};

const calcHeight = (r: number, g: number, b: number, a: number): number | null => {
    const x = r * Math.pow(2, 16) + g * Math.pow(2, 8) + b;
    const twoToThePowerOf23 = Math.pow(2, 23);
    const twoToThePowerOf24 = Math.pow(2, 24);
    const u = 0.01;
    if (x < twoToThePowerOf23 && a !== 0) {
        return x * u;
    } else if (x === twoToThePowerOf23 || a === 0) {
        return null;
    } else {
        return (x - twoToThePowerOf24) * u;
    }
};
