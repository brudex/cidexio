 
using Microsoft.Extensions.Logging;

namespace cedix.io
{


public static class ApplicationLogging
{
  private static ILoggerFactory LoggerFactory;
  public static ILogger CreateLogger<T>() => LoggerFactory.CreateLogger<T>();
   public static void ConfigureLogger(ILoggerFactory factory)
	{
    LoggerFactory =factory;
 	}
   
}

}