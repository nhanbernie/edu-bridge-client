import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AvailabilityBlockDto } from "@/services/availability-block/type";

// Temporary slot interface for calendar
interface TempSlot {
  id: string;
  start: string;
  end: string;
  title: string;
  backgroundColor?: string;
  borderColor?: string;
  isTemp?: boolean; // Make optional to match TimeSlot
}

interface AvailabilityBlockState {
  availabilityBlocks: AvailabilityBlockDto[];
  selectedAvailabilityBlock: AvailabilityBlockDto | null;
  tempSlots: TempSlot[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AvailabilityBlockState = {
  availabilityBlocks: [],
  selectedAvailabilityBlock: null,
  tempSlots: [],
  isLoading: false,
  error: null,
};

const availabilityBlockSlice = createSlice({
  name: "availabilityBlock",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAvailabilityBlocks: (state, action: PayloadAction<AvailabilityBlockDto[]>) => {
      state.availabilityBlocks = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addAvailabilityBlock: (state, action: PayloadAction<AvailabilityBlockDto>) => {
      state.availabilityBlocks.push(action.payload);
    },
    updateAvailabilityBlock: (state, action: PayloadAction<AvailabilityBlockDto>) => {
      const index = state.availabilityBlocks.findIndex(
        (block) => block.blockId === action.payload.blockId
      );
      if (index !== -1) {
        state.availabilityBlocks[index] = action.payload;
      }
    },
    deleteAvailabilityBlock: (state, action: PayloadAction<string>) => {
      state.availabilityBlocks = state.availabilityBlocks.filter(
        (block) => block.blockId !== action.payload
      );
    },
    setSelectedAvailabilityBlock: (state, action: PayloadAction<AvailabilityBlockDto | null>) => {
      state.selectedAvailabilityBlock = action.payload;
    },
    clearAvailabilityBlocks: (state) => {
      state.availabilityBlocks = [];
      state.selectedAvailabilityBlock = null;
      state.error = null;
    },
    // Temp slots actions
    addTempSlot: (state, action: PayloadAction<TempSlot>) => {
      state.tempSlots.push(action.payload);
    },
    updateTempSlot: (state, action: PayloadAction<TempSlot>) => {
      const index = state.tempSlots.findIndex((slot) => slot.id === action.payload.id);
      if (index !== -1) {
        state.tempSlots[index] = action.payload;
      }
    },
    removeTempSlot: (state, action: PayloadAction<string>) => {
      state.tempSlots = state.tempSlots.filter((slot) => slot.id !== action.payload);
    },
    clearTempSlots: (state) => {
      state.tempSlots = [];
    },
    setTempSlots: (state, action: PayloadAction<TempSlot[]>) => {
      state.tempSlots = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setAvailabilityBlocks,
  addAvailabilityBlock,
  updateAvailabilityBlock,
  deleteAvailabilityBlock,
  setSelectedAvailabilityBlock,
  clearAvailabilityBlocks,
  addTempSlot,
  updateTempSlot,
  removeTempSlot,
  clearTempSlots,
  setTempSlots,
} = availabilityBlockSlice.actions;

export const availabilityBlockReducer = availabilityBlockSlice.reducer;

// Selectors
export const selectAvailabilityBlocks = (state: { availabilityBlock: AvailabilityBlockState }) =>
  state.availabilityBlock.availabilityBlocks;
export const selectSelectedAvailabilityBlock = (state: {
  availabilityBlock: AvailabilityBlockState;
}) => state.availabilityBlock.selectedAvailabilityBlock;
export const selectAvailabilityBlockLoading = (state: {
  availabilityBlock: AvailabilityBlockState;
}) => state.availabilityBlock.isLoading;
export const selectAvailabilityBlockError = (state: {
  availabilityBlock: AvailabilityBlockState;
}) => state.availabilityBlock.error;
export const selectTempSlots = (state: { availabilityBlock: AvailabilityBlockState }) =>
  state.availabilityBlock.tempSlots;

// Export TempSlot type for use in components
export type { TempSlot };
