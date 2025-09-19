

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import ApiRoutes from "../../helpers/ApiRoutes";
import { AuthResponseModel, UserSliceState } from "../../helpers/Interfaces";
import NetworkRequest from "../../helpers/NetworkManager";

// async thunk for signu (POST request)
export const signupUser = createAsyncThunk(
  "userSlice/signupUser",
  async (payload: {}, { rejectWithValue }) => {
    try {
      let path = ApiRoutes.ENDPOINTS.signup
      let response = await NetworkRequest.post(path, {
        ...payload,
        first_name: "",
        last_name: ""
      })
      return response.data as AuthResponseModel
    }
    catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }

  }
);

export const loginUser = createAsyncThunk(
  "userSlice/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      let path = ApiRoutes.ENDPOINTS.login
      let response = await NetworkRequest.post(path, payload)
      console.log("Login User log =====", response.data as AuthResponseModel)
      return response.data as AuthResponseModel
    }
    catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }

  }
);
export const fileUpload = createAsyncThunk(
  "userSlice/fileupload",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      let path = ApiRoutes.ENDPOINTS.ota

      let response = await NetworkRequest.post(path, payload, {
        timeout: 120000,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        onUploadProgress: (progressEvent) => {
          console.log("Progress Event =====",progressEvent)
          if(progressEvent.progress && progressEvent.progress> 0 ) {
            let fileUploadProgress = parseInt(progressEvent.progress* 100); // Parse progress as an integer
             fileUploadProgress = Math.min(Math.max(fileUploadProgress, 0), 100); // Clamp progress between 0 and 100
              dispatch(fileUploadReducer({ uploadProgress: fileUploadProgress }));
          }else{
             dispatch(fileUploadReducer({ uploadProgress: 0 }));
          }
          
        }
      })
      return response
    }
    catch (error) {
      console.log("Error ====",error)
      if(error.code === '"ERR_NETWORK"') {
        throw error
      }
      if (!error.response) {
        throw error;
      }
      
      return rejectWithValue(error.response.data);
    }

  }
);


const INITIAL_STATE: UserSliceState = { user: null, loading: false, error: null, authToken: null, fileProgress: 0 }
const userSlice = createSlice({
  name: "userSlice",
  initialState: INITIAL_STATE,
  reducers: {
    setAuthToken: (state, action: PayloadAction<{ authToken: string }>) => {
      state.authToken = action.payload.authToken
    },
    logout: (state, _) => {
      return INITIAL_STATE;
    },
    fileUploadReducer: (state, action: PayloadAction<{ uploadProgress: number }>) => {
      state.fileProgress = action.payload.uploadProgress
    },
    fileUploadReset: (state) => {
      state.fileProgress = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<AuthResponseModel>) => {
        state.loading = false;
        state.user = action.payload.data.user ?? null;
        // state.authToken = action.payload.data.token ?? null

      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fileUpload.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fileProgress = 0;
      })
      .addCase(fileUpload.fulfilled, (state, _) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fileUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponseModel>) => {
        state.loading = false;
        state.user = action.payload.data.user ?? null;
        // state.authToken = action.payload.data.token ?? null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default userSlice.reducer;
export const { setAuthToken, logout, fileUploadReducer, fileUploadReset } = userSlice.actions;
