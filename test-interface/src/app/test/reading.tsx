import Middle from "./middle";

export default function Reading() {
  return (
    <>
      <Middle />
      <div className="flex h-[calc(100vh-64px)] p-4">
        {/* Left side for article */}
        <div className="flex-1 bg-gray-100 border border-gray-300 rounded-lg overflow-y-auto p-4">
          <div className="tpo-article-box">
            <div className="tpo-article" style={{ height: "495px" }}>
              <div
                className="article-title text-center font-bold"
                style={{ fontSize: "20px" }}
              >
                Europe’s Early Sea Trade with Asia
              </div>
              <div className="article-content" style={{ fontSize: "16px" }}>
                <p>
                  In the fourteenth century, a number of political developments
                  cut Europe’s overland trade routes to southern and eastern
                  Asia, with which Europe had had important and highly
                  profitable commercial ties since the twelfth century. This
                  development, coming as it did when the bottom had fallen out
                  of the European economy, provided an
                  <span
                    style={{
                      color: "rgb(255, 255, 255)",
                      fontWeight: "600",
                      background: "rgb(0, 107, 122)",
                    }}
                  >
                    impetus
                  </span>
                  to a long-held desire to secure direct relations with the East
                  by establishing a sea trade. Widely reported, if somewhat
                  distrusted, accounts by figures like the famous traveler from
                  Venice, Marco Polo, of the willingness of people in China to
                  trade with Europeans and of the immensity of the wealth to be
                  gained by such contact made the idea irresistible.
                  Possibilities for trade seemed promising, but no hope existed
                  for maintaining the traditional routes over land. A new way
                  had to be found.
                </p>
                <p style={{ whiteSpace: "normal" }}>
                  <br />
                </p>
                <p style={{ whiteSpace: "normal" }}>
                  The chief problem was technological: How were the Europeans to
                  reach the East? Europe’s maritime tradition had developed in
                  the context of easily navigable seas—the Mediterranean, the
                  Baltic, and, to a lesser extent, the North Sea between England
                  and the Continent—not of vast oceans. New types of ships were
                  needed, new methods of finding one’s way, new techniques for
                  financing so vast a scheme.
                  <span style={{ color: "rgb(54, 54, 61)" }}>
                    The sheer scale of the investment it took to begin
                    commercial expansion at sea reflects the immensity of the
                    profits that such East-West trade could create.
                  </span>
                  Spices were the most sought-after commodities. Spices not only
                  dramatically improved the taste of the European diet but also
                  were used to manufacture perfumes and certain medicines. But
                  even high-priced commodities like spices had to be transported
                  in large bulk in order to justify the expense and trouble of
                  sailing around the African continent all the way to India and
                  China.
                </p>
                <p style={{ whiteSpace: "normal" }}>
                  <br />
                </p>
                <p style={{ whiteSpace: "normal" }}>
                  The principal seagoing ship used throughout the Middle Ages
                  was the galley, a long, low ship fitted with sails but driven
                  primarily by oars. The largest galleys had as many as 50
                  oarsmen. Since they had relatively shallow hulls, they were
                  unstable when driven by sail or when on rough water; hence
                  they were unsuitable for the voyage to the East. Even if they
                  hugged the African coastline, they had little chance of
                  surviving a crossing of the Indian Ocean. Shortly after 1400,
                  shipbuilders began developing a new type of vessel properly
                  designed to operate in rough, open water: the caravel. It had
                  a wider and deeper hull than the galley and hence could carry
                  more cargo; increased stability made it possible to add
                  multiple masts and sails. In the largest caravels, two main
                  masts held large square sails that provided the bulk of the
                  thrust driving the ship forward, while a smaller forward mast
                  held a triangular-shaped sail, called a lateen sail, which
                  could be moved into a variety of positions to maneuver the
                  ship.
                </p>
                <p style={{ whiteSpace: "normal" }}>
                  <br />
                </p>
                <p style={{ whiteSpace: "normal" }}>
                  The astrolabe had long been the primary instrument for
                  navigation, having been introduced in the eleventh century. It
                  operated by measuring the height of the Sun and the fixed
                  stars; by calculating the angles created by these points, it
                  determined the degree of latitude at which one stood. (The
                  problem of determining longitude, though, was not solved until
                  the eighteenth century.) By the early thirteenth century,
                  Western Europeans had also
                  <span style={{ color: "rgb(54, 54, 61)" }}>
                    developed and put into use the magnetic compass
                  </span>
                  , which helped when clouds obliterated both the Sun and the
                  stars. Also beginning in the thirteenth century, there were
                  new maps refined by precise calculations and the reports of
                  sailors that made it possible to trace one’s path with
                  reasonable accuracy. Certain institutional and practical norms
                  had become established as well. A maritime code known as the
                  Consulate of the Sea, which originated in the western
                  Mediterranean region in the fourteenth century, won acceptance
                  by a majority of sea goers as the normative code for maritime
                  conduct; it defined such matters as the authority of a ship’s
                  officers, protocols of command, pay structures, the rights of
                  sailors, and the rules of engagement when ships met one
                  another on the sea-lanes. Thus by about 1400 the key elements
                  were in place to enable Europe to begin its seaward adventure.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Right side for title */}
        <div className="flex-1 flex flex-col px-4">
          <h1 className="text-2xl font-bold ">
            According to paragraph 1, why was it necessary to find a new way for
            European merchants to reach the East?
          </h1>
          <div className="mt-4 text-lg">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="option1"
                name="question"
                value="D"
                className="w-6 h-6"
              />
              <label htmlFor="option1" className="ml-2">
                Traditional ways of trading with the East had become blocked
                because of political events.
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="option2"
                name="question"
                value="A"
                className="w-6 h-6"
              />
              <label htmlFor="option2" className="ml-2">
                People in China were finally ready to trade with Europeans.
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="option3"
                name="question"
                value="B"
                className="w-6 h-6"
              />
              <label htmlFor="option3" className="ml-2">
                The European economy was failing because there was no trade with
                the East.
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="option4"
                name="question"
                value="C"
                className="w-6 h-6"
              />
              <label htmlFor="option4" className="ml-2">
                Traditional ways of trading with the East had become very
                costly.
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
