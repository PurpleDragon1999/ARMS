using System;
using System.Runtime.Serialization;

namespace Hrms.Core
{

    /// <summary>
    /// Base exception type for those are thrown by Abp system for Hrms specific exceptions.
    /// </summary>
    [Serializable]
    public class HrmsException : Exception
    {
        /// <summary>
        /// Creates a new <see cref="HrmsException"/> object.
        /// </summary>
        public HrmsException()
        {

        }

        /// <summary>
        /// Creates a new <see cref="HrmsException"/> object.
        /// </summary>
        public HrmsException(SerializationInfo serializationInfo, StreamingContext context)
            : base(serializationInfo, context)
        {

        }

        /// <summary>
        /// Creates a new <see cref="HrmsException"/> object.
        /// </summary>
        /// <param name="message">Exception message</param>
        public HrmsException(string message)
            : base(message)
        {

        }

        /// <summary>
        /// Creates a new <see cref="HrmsException"/> object.
        /// </summary>
        /// <param name="message">Exception message</param>
        /// <param name="innerException">Inner exception</param>
        public HrmsException(string message, Exception innerException)
            : base(message, innerException)
        {

        }
    }
}