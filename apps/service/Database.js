import SQLite from "react-native-sqlite-storage";

export const databaseName = 'ProductDatabase.db';
export const databaseVersion = '1.0';
export const databaseDisplayName = 'Product Database';
export const databaseSize = 200000;
export const ProductDatabase = SQLite.openDatabase(
  databaseName,
  databaseVersion,
  databaseDisplayName,
  databaseSize,
);
