import { useEffect, useState } from "react";
import { ImmutableLike } from "react-map-gl/maplibre";

export interface MapStyle {
    id: string;
    name: string;
    style: string | maplibregl.StyleSpecification | ImmutableLike<maplibregl.StyleSpecification>;
    deletable: boolean;
    icon?: string;
}

const basePath = (() => {
    const injected = (typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH) || "";
    if (injected) return injected;

    if (typeof window !== "undefined") {
        if (window.location.hostname.endsWith("github.io")) {
            const segs = window.location.pathname.split("/").filter(Boolean);
            if (segs.length > 0) return "/" + segs[0];
        }
    }
    // Cloudflare Pages etc.
    return "";
})();

console.warn("BASE_PATH:", basePath);

const getAbsoluteUrl = (path: string) => {
    // if local development (localhost), return relative path
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
        return `${basePath}${path}`;
    }

    // in production, return absolute URL
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}${basePath}${path}`;
};

const DEFAULT_MAP_STYLES: MapStyle[] = [
    {
        id: "std-3d",
        name: "標準地図",
        style: getAbsoluteUrl("/styles/std.json"),
        icon: `${basePath}/images/std.png`,
        deletable: false,
    },
    {
        id: "pale-3d",
        name: "淡色地図",
        style: getAbsoluteUrl("/styles/pale.json"),
        icon: `${basePath}/images/pale.png`,
        deletable: false,
    },
    {
        id: "skeleton",
        name: "白地図",
        style: getAbsoluteUrl("/styles/skeleton.json"),
        icon: `${basePath}/images/skeleton.png`,
        deletable: false,
    },
    {
        id: "english",
        name: "English",
        style: getAbsoluteUrl("/styles/std-english.json"),
        icon: `${basePath}/images/std-english.png`,
        deletable: false,
    },
    {
        id: "seamlessphoto",
        name: "写真",
        style: getAbsoluteUrl("/styles/seamlessphoto.json"),
        icon: `${basePath}/images/seamlessphoto.png`,
        deletable: false,
    },
];

export const useMapStyles = () => {
    const [mapStyles, setMapStyles] = useState<MapStyle[]>(DEFAULT_MAP_STYLES);
    const [selectedMapStyle, setSelectedMapStyle] = useState<MapStyle>(DEFAULT_MAP_STYLES[0]);

    useEffect(() => {
        const stored = localStorage.getItem("uploadedMapStyles");
        if (stored) {
            const uploadedStyles = JSON.parse(stored) as MapStyle[];
            setMapStyles([...DEFAULT_MAP_STYLES, ...uploadedStyles]);
        }
    }, []);

    const handleStyleUploaded = (style: MapStyle) => {
        setMapStyles((prev) => [...prev, style]);
        const stored = JSON.parse(localStorage.getItem("uploadedMapStyles") || "[]") as MapStyle[];
        localStorage.setItem("uploadedMapStyles", JSON.stringify([...stored, style]));
    };

    const handleStyleDeleted = (style: MapStyle) => {
        const newStyles = mapStyles.filter((s) => s.id !== style.id);
        setMapStyles(newStyles);

        if (selectedMapStyle.id === style.id) {
            setSelectedMapStyle(DEFAULT_MAP_STYLES[0]);
        }

        const stored = JSON.parse(localStorage.getItem("uploadedMapStyles") || "[]") as MapStyle[];
        localStorage.setItem("uploadedMapStyles", JSON.stringify(stored.filter((s) => s.id !== style.id)));
    };

    return {
        mapStyles,
        selectedMapStyle,
        setSelectedMapStyle,
        handleStyleUploaded,
        handleStyleDeleted,
    };
};
