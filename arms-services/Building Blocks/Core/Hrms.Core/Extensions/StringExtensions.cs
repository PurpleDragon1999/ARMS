using System;
using System.Text.RegularExpressions;

namespace Hrms.Core
{
	public static class StringExtensions
	{
		public static bool isEmailValid(this String email)
		{
			Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
			Match match = regex.Match(email);
			return match.Success;
		}
	}
}
