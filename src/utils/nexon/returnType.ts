import { NEXON_API_ERRORS } from '@/constants/error';

type NexonErrorCode = keyof typeof NEXON_API_ERRORS;
export type NexonErrorRes = {
  error: {
    name: NexonErrorCode;
    message: string;
  };
};

export interface CharacterSignatureType {
  ocid: string;
  character_name: string;
  world_name: string;
  character_class: string;
  character_level: number;
}

export interface NexonAccountListType {
  account_id: string;
  character_list: CharacterSignatureType[];
}

export interface NexonCharacterListType {
  account_list: NexonAccountListType[];
}

export interface NexonCharacterBasicType {
  date: Date | null;
  character_name: string;
  world_name: string;
  character_gender: string;
  character_class: string;
  character_class_level: string;
  character_level: number;
  character_exp: number;
  character_exp_rate: string;
  character_guild_name: string;
  character_image: string;
  character_date_create: Date;
  access_flag: string;
  liberation_quest_clear_flag: string;
}

type StatType = {
  stat_name: string;
  stat_value: string;
};

export interface NexonCharacterStatType {
  date: Date | null;
  character_class: string;
  final_stat: StatType[];
  remain_ap: number;
}
