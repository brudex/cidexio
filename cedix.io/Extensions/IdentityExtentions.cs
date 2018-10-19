using cedix.io.Models;
using cedix.io.Models.DbModels;
using Microsoft.AspNetCore.Identity;


namespace cedix.io.Extensions
{
    public static class IdentityExtentions
    {

        public static AccountProfile GetAccountProfile(this IdentityUser user)
        {
           AccountProfile accountProfile = DbHandler.Instance.GetAcctProfileByUserId(user.Id);
           return accountProfile;
        }

    }
}
