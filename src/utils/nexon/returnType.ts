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
