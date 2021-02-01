import React from 'react';
import { GameEngine as GameEngineNative } from 'react-native-game-engine';
import { GameEngine as GameEngineWeb } from 'react-game-engine';
import { Platform } from 'react-native';

const gameEngineExport = Platform.OS === 'ios' || Platform.OS === 'android' ? GameEngineNative : GameEngineWeb;

export default gameEngineExport;