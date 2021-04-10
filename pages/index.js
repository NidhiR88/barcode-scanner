import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function WelcomePage() {
  return (
    <div>
      <Card className="home-page">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Welcome to Barcode Scanner
          </Typography>
        </CardContent>
      </Card>
      <Button
        style={{ margin: '100px' }}
        variant="contained"
        color="primary"
        href="/scannew"
      >
        Scan new
      </Button>
    </div>
  );
}

export default WelcomePage;
