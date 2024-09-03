export const metadata = {
    title: 'Meu Projeto',
    description: 'Descrição do meu projeto',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                {children}
            </body>
        </html>
    );
}
