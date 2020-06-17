//using System;
//using Arms.Domain.Entities;

//namespace Arms.Domain.Extensions
//{
//    public static class EmployeeExtensions
//    {
//        public static bool IsDallasEmployee(this Employee employee)
//        {
//            return employee.Location.LocationName.ToUpper() == "US";
//        }

//        public static bool IsIndiaEmployee(this Employee employee)
//        {
//            return employee.Location.LocationName.ToUpper() == "INDIA";
//        }

//        public static string GetFullName(this Employee employee)
//        {
//            if (employee == null)
//            {
//                throw new ArgumentNullException(nameof(employee));
//            }

//            var firstName = employee.FirstName;
//            var lastName = employee.LastName;

//            string fullName = "";
//            if (!String.IsNullOrWhiteSpace(firstName) && !String.IsNullOrWhiteSpace(lastName))
//            {
//                fullName = string.Format("{0} {1}", firstName, lastName);
//            }
//            else
//            {
//                if (!String.IsNullOrWhiteSpace(firstName))
//                    fullName = firstName;

//                if (!String.IsNullOrWhiteSpace(lastName))
//                    fullName = lastName;
//            }

//            return fullName;
//        }
//    }
//}
