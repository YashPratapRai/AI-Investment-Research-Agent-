import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

async function test() {
  const search = await yahooFinance.search("NVIDIA");
  console.log(search.quotes[0]);

  const quote = await yahooFinance.quote(search.quotes[0].symbol);
  console.log(quote);
}

test();