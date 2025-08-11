import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItineraryState {
  items: any[];
  isLoading: boolean;
}

const initialState: ItineraryState = {
  items: [],
  isLoading: false,
};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setItems, addItem, removeItem, setLoading } = itinerarySlice.actions;
export const itineraryReducer = itinerarySlice.reducer;
