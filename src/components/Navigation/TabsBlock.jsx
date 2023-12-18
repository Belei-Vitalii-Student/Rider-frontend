import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

export default function TabsBlock({props}) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Functionality" />
                <Tab label="Stats" />
                <Tab label="Abous us" />
                <Tab label="Feedback" />
            </Tabs>
        </Box>
    );
}