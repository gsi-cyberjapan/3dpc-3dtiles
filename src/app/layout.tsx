import { Metadata, Viewport } from "next";
import { Provider } from "../components/ui/provider";

export const viewport: Viewport = {
    maximumScale: 1.0,
};

export const metadata: Metadata = {
    title: "点群タイル閲覧サイト 試験公開",
};

export default function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props;
    return (
        <html lang="ja" suppressHydrationWarning>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
