using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;

namespace cedix.io.Models
{
    public class Utils
    {
        private static System.Random _random = new System.Random();

        public static bool IsValidAddress(string address)
        {
            if(true){//!SettingsData.IsBtcMainNet){
                return true;
            }
            try
            {
                if (address.Length < 26 || address.Length > 35) throw new Exception("wrong length");
                var decoded = DecodeBase58(address);
                var d1 = Hash(decoded.SubArray(0, 21));
                var d2 = Hash(d1);
                if (!decoded.SubArray(21, 4).SequenceEqual(d2.SubArray(0, 4))) throw new Exception("bad digest");
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "Error validating btc address");
            }
            return false; 
        }




        const string Alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        const int Size = 25;

        private static byte[] DecodeBase58(string input)
        {
            var output = new byte[Size];
            foreach (var t in input)
            {
                var p = Alphabet.IndexOf(t);
                if (p == -1) throw new Exception("invalid character found");
                var j = Size;
                while (--j > 0)
                {
                    p += 58 * output[j];
                    output[j] = (byte)(p % 256);
                    p /= 256;
                }
                if (p != 0) throw new Exception("address too long");
            }
            return output;
        }

        private static byte[] Hash(byte[] bytes)
        {
            var hasher = new SHA256Managed();
            return hasher.ComputeHash(bytes);
        }

        public static int GetRandomInt(int minimum, int maximum)
        {
            int randomIndex = Convert.ToInt32(_random.NextDouble() * (maximum - minimum) + minimum);
            return randomIndex;
        }




        internal static bool IsValidEmail(string email)
        {
            return new EmailAddressAttribute().IsValid(email);
        }
    }

    public static class ArrayExtensions
    {
        public static T[] SubArray<T>(this T[] data, int index, int length)
        {
            var result = new T[length];
            Array.Copy(data, index, result, 0, length);
            return result;
        }
    }


}