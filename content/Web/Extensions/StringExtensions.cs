using Ganss.XSS;
using Microsoft.AspNetCore.Html;

namespace Web.Extensions
{
    public static class StringExtensions
    {
        /// <summary>
        /// Convert a standard string into a htmlstring for rendering in a view
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static HtmlString ToHtmlString(this string value)
        {
            var sanitizer = new HtmlSanitizer();
            sanitizer.AllowedTags.Add("link");
            sanitizer.AllowedTags.Add("script");
            sanitizer.AllowedTags.Add("noscript");
            sanitizer.AllowedAttributes.Add("as");
            sanitizer.AllowedAttributes.Add("id");
            var sanitized = sanitizer.Sanitize(value);
            sanitized = sanitized.Replace("/js", "/dist/js");
            sanitized = sanitized.Replace("/css", "/dist/css");

            return new HtmlString(sanitized);
            //return new HtmlString(sanitized);
        }
    }
}
