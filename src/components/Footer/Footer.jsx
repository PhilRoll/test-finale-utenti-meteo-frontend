import React from 'react';

export function Footer() {
    return (
        <footer className="py-3 bg-body-tertiary text-muted text-center">
            © {new Date().getFullYear()} Filippo Rotolo
        </footer>
    );
}
