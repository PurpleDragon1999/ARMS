using System;
using System.Runtime.Serialization;

namespace Hrms.Core
{
    public class UserConfirmationRequiredException : HrmsException
    {
        /// <summary>
        /// Additional information about the exception.
        /// </summary>
        public string Details { get; private set; }

        /// <summary>
        /// Constructor.
        /// </summary>
        public UserConfirmationRequiredException()
            : base()
        {
        }

        /// <summary>
        /// Constructor for serializing.
        /// </summary>
        public UserConfirmationRequiredException(SerializationInfo serializationInfo, StreamingContext context)
            : base(serializationInfo, context)
        {
        }

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="message">Exception message</param>
        public UserConfirmationRequiredException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="message">Exception message</param>
        /// <param name="details">Additional information about the exception</param>
        public UserConfirmationRequiredException(string message, string details)
            : this(message)
        {
            Details = details;
        }

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="message">Exception message</param>
        /// <param name="innerException">Inner exception</param>
        public UserConfirmationRequiredException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="message">Exception message</param>
        /// <param name="details">Additional information about the exception</param>
        /// <param name="innerException">Inner exception</param>
        public UserConfirmationRequiredException(string message, string details, Exception innerException)
            : this(message, innerException)
        {
            Details = details;
        }
    }
}