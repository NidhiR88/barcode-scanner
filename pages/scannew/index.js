import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ScannerComponent } from '../../components/scanner';

function ScanItem() {
  return (
    <Card>
      <CardContent>
        <ScannerComponent />
      </CardContent>
    </Card>
  );
}

export default ScanItem;
