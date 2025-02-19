import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  // private supabase: SupabaseClient<any, 'public', any>;
  // constructor() {
  //   this.supabase = createClient(
  //     process.env.SUPABASE_URL,
  //     process.env.SUPABASE_KEY,
  //   );
  // }
  // async uploadAvatar(file: Express.Multer.File, id: string): Promise<string> {
  //   const { buffer, originalname } = file;
  //   const filePath = `avatars/${Date.now()}-${id}-${originalname}`;
  //   const { data, error } = await this.supabase.storage
  //     .from('avatars')
  //     .upload(filePath, buffer, {
  //       cacheControl: '3600',
  //       upsert: false,
  //     });
  //   if (error) {
  //     console.log('Error uploading avatar:', error);
  //     throw new Error(error.message);
  //   }
  //   const { data: publicUrlData } = this.supabase.storage
  //     .from('avatars')
  //     .getPublicUrl(filePath);
  //   console.log(publicUrlData);
  //   return publicUrlData.publicUrl;
  // }
}
