"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Article = {
  title: string;
  url: string;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();

        console.log("APIからのデータ:", data); // データを確認

        if (data.error) {
          setError(data.error); // エラーがあればエラーメッセージを表示
        } else if (data.articles && data.articles.length > 0) {
          setArticles(data.articles); // 記事があればセット
        } else {
          setError("ニュースが取得できませんでした"); // 記事がない場合
        }
      } catch (err) {
        setError("エラーが発生しました"); // fetchでエラーが発生した場合
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>最新ニュース</h1>
        {loading && <p>読み込み中...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
