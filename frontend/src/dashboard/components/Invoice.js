import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
export const Invoice = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>My cool content here!</div>
    );
});