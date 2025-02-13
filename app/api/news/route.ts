import { NextResponse } from "next/server";

const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";
const API_KEY = process.env.NEWS_API_KEY || "YOUR_NEWSAPI_KEY"; // 環境変数 or 直接キーを設定

export async function GET() {
  try {
    console.log("ニュースAPIを取得中...");

    const res = await fetch(`${NEWS_API_URL}?country=jp&apiKey=${API_KEY}`);
    if (!res.ok) {
      throw new Error(`APIエラー: ${res.status}`);
    }

    const data = await res.json();
    console.log("取得したデータ:", data); // データを確認

    if (!data.articles || data.articles.length === 0) {
      throw new Error("記事が見つかりませんでした");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("ニュースAPI取得エラー:", error);
    return NextResponse.json(
      { error: `ニュース取得に失敗しました: ${error.message}` },
      { status: 500 }
    );
  }
}