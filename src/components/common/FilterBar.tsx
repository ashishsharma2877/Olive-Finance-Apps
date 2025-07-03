import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

interface FilterBarProps {
  filters: FilterConfig[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filters }) => (
  <Box display="flex" gap={2} mb={3}>
    {filters.map((filter, idx) => (
      <FormControl key={filter.label} size="small" sx={{ minWidth: 160 }}>
        <InputLabel>{filter.label}</InputLabel>
        <Select
          value={filter.value}
          label={filter.label}
          onChange={e => filter.onChange(e.target.value)}
        >
          {filter.options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ))}
  </Box>
);

export default FilterBar; 