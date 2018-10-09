using System;
using Microsoft.Extensions.Logging;

namespace cedix.io {
 public  class Logger{
 
        private static ILogger Instance { get; } = ApplicationLogging.CreateLogger<Logger>(); 
        public static void Info(object message)
        {
            Instance.LogInformation(message.ToString());
        }

        public static void Debug(object message)
        {
            Instance.LogDebug(message.ToString());
        }

        public static void Error(Exception exception, object message = null)
        {
            if(message== null){
                message = string.Empty;
            }
            Instance.LogError( exception,message.ToString());
        }

        public static void Fatal(Exception exception, object message = null)
        {
            if(message== null){
                message = string.Empty;
            }
            Instance.LogCritical( exception,message.ToString());
        }

 }   
}
